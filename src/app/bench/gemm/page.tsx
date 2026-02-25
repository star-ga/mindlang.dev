"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BenchResult {
  avgMs: number;
  gflops: number;
  minDispatchMs: number;
  initMs: number;
  runs: number;
}

type BenchState = "idle" | "running" | "done" | "error";

interface SideState {
  state: BenchState;
  result: BenchResult | null;
  error: string | null;
}

// ---------------------------------------------------------------------------
// WebGPU GEMM Benchmark — MindLang path
// ---------------------------------------------------------------------------

async function benchMindLang(
  M: number,
  N: number,
  K: number,
  numRuns: number,
  log: (msg: string) => void
): Promise<BenchResult> {
  if (!navigator.gpu) throw new Error("WebGPU not available in this browser.");

  log("Requesting GPU adapter...");
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
  if (!adapter) throw new Error("No WebGPU adapter found.");

  const device = await adapter.requestDevice({
    requiredLimits: {
      maxStorageBufferBindingSize: Math.min(
        adapter.limits.maxStorageBufferBindingSize,
        Math.max(M * K * 4, K * N * 4, M * N * 4) + 4096
      ),
      maxBufferSize: Math.min(
        adapter.limits.maxBufferSize,
        Math.max(M * K * 4, K * N * 4, M * N * 4) + 4096
      ),
    },
  });

  log(`GPU: ${adapter.info?.device ?? "unknown"}`);

  // Fetch WGSL shader
  log("Fetching gemm.wgsl...");
  const t0 = performance.now();
  const wgslRes = await fetch("/bench/gemm/gemm.wgsl");
  if (!wgslRes.ok) throw new Error(`Failed to fetch gemm.wgsl: ${wgslRes.status}`);
  const wgslSource = await wgslRes.text();

  // Compile shader
  log("Compiling WGSL shader...");
  const shaderModule = device.createShaderModule({ code: wgslSource });
  const compileInfo = await shaderModule.getCompilationInfo();
  const compileMs = performance.now() - t0;

  for (const msg of compileInfo.messages) {
    if (msg.type === "error") throw new Error(`WGSL compile error: ${msg.message}`);
  }
  log(`Shader compiled in ${compileMs.toFixed(1)} ms`);

  // Create pipeline
  const pipeline = await device.createComputePipelineAsync({
    layout: "auto",
    compute: { module: shaderModule, entryPoint: "main" },
  });

  // Params uniform buffer
  const paramsData = new ArrayBuffer(16);
  const paramsView = new DataView(paramsData);
  paramsView.setUint32(0, M, true);
  paramsView.setUint32(4, N, true);
  paramsView.setUint32(8, K, true);
  paramsView.setFloat32(12, 1.0, true);

  const paramsBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(paramsBuffer, 0, paramsData);

  // Allocate A, B, C storage buffers
  const aData = new Float32Array(M * K);
  const bData = new Float32Array(K * N);
  for (let i = 0; i < aData.length; i++) aData[i] = Math.random();
  for (let i = 0; i < bData.length; i++) bData[i] = Math.random();

  const aBuffer = device.createBuffer({
    size: aData.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  const bBuffer = device.createBuffer({
    size: bData.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  const cBuffer = device.createBuffer({
    size: M * N * 4,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
  });

  log("Uploading matrix data to GPU...");
  device.queue.writeBuffer(aBuffer, 0, aData);
  device.queue.writeBuffer(bBuffer, 0, bData);

  // Bind group
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: paramsBuffer } },
      { binding: 1, resource: { buffer: aBuffer } },
      { binding: 2, resource: { buffer: bBuffer } },
      { binding: 3, resource: { buffer: cBuffer } },
    ],
  });

  const wgX = Math.ceil(N / 16);
  const wgY = Math.ceil(M / 16);

  function dispatch() {
    const enc = device.createCommandEncoder();
    const pass = enc.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(wgX, wgY, 1);
    pass.end();
    device.queue.submit([enc.finish()]);
  }

  // Warmup
  log("Warmup dispatch...");
  dispatch();
  await device.queue.onSubmittedWorkDone();

  // Timed runs
  log(`Running ${numRuns} timed dispatches...`);
  const times: number[] = [];
  for (let i = 0; i < numRuns; i++) {
    const t = performance.now();
    dispatch();
    await device.queue.onSubmittedWorkDone();
    times.push(performance.now() - t);
    log(`  Run ${i + 1}/${numRuns}: ${times[times.length - 1].toFixed(2)} ms`);
  }

  const avgMs = times.reduce((a, b) => a + b, 0) / times.length;
  const minDispatchMs = Math.min(...times);
  const gflops = (2 * M * N * K) / (avgMs * 1e6);

  // Cleanup
  paramsBuffer.destroy();
  aBuffer.destroy();
  bBuffer.destroy();
  cBuffer.destroy();
  device.destroy();

  return { avgMs, gflops, minDispatchMs, initMs: compileMs, runs: numRuns };
}

// ---------------------------------------------------------------------------
// WebGPU GEMM Benchmark — ONNX Runtime Web path
// ---------------------------------------------------------------------------

async function benchOnnxWeb(
  M: number,
  N: number,
  K: number,
  numRuns: number,
  log: (msg: string) => void
): Promise<BenchResult> {
  // Dynamically load onnxruntime-web from CDN
  log("Loading onnxruntime-web from CDN...");
  await new Promise<void>((resolve, reject) => {
    if ((window as unknown as Record<string, unknown>)["ort"]) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/dist/ort.all.min.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load onnxruntime-web from CDN."));
    document.head.appendChild(script);
  });

  const ort = (window as unknown as Record<string, unknown>)["ort"] as {
    InferenceSession: {
      create: (
        data: Uint8Array,
        opts: { executionProviders: string[] }
      ) => Promise<{
        run: (feeds: Record<string, unknown>) => Promise<Record<string, { data: Float32Array }>>;
        inputNames: string[];
      }>;
    };
    Tensor: new (type: string, data: Float32Array, dims: number[]) => unknown;
    env: { wasm: { numThreads: number } };
  };

  ort.env.wasm.numThreads = 1;

  // Fetch pre-built ONNX MatMul model (dynamic shapes, validated at build time)
  log("Fetching matmul.onnx model...");
  const modelRes = await fetch("/bench/gemm/matmul.onnx");
  if (!modelRes.ok) throw new Error(`Failed to fetch matmul.onnx: ${modelRes.status}`);
  const modelBytes = new Uint8Array(await modelRes.arrayBuffer());
  log(`Model size: ${modelBytes.length} bytes`);

  // Create InferenceSession
  log("Creating InferenceSession with WebGPU provider...");
  const t0 = performance.now();
  const session = await ort.InferenceSession.create(modelBytes, {
    executionProviders: ["webgpu"],
  });
  const initMs = performance.now() - t0;
  log(`Session init: ${initMs.toFixed(1)} ms`);

  // Prepare input tensors
  const aData = new Float32Array(M * K);
  const bData = new Float32Array(K * N);
  for (let i = 0; i < aData.length; i++) aData[i] = Math.random();
  for (let i = 0; i < bData.length; i++) bData[i] = Math.random();

  const tensorA = new ort.Tensor("float32", aData, [M, K]);
  const tensorB = new ort.Tensor("float32", bData, [K, N]);
  const feeds = { A: tensorA, B: tensorB };

  // Warmup
  log("Warmup run...");
  await session.run(feeds);

  // Timed runs
  log(`Running ${numRuns} timed inference passes...`);
  const times: number[] = [];
  for (let i = 0; i < numRuns; i++) {
    const t = performance.now();
    await session.run(feeds);
    times.push(performance.now() - t);
    log(`  Run ${i + 1}/${numRuns}: ${times[times.length - 1].toFixed(2)} ms`);
  }

  const avgMs = times.reduce((a, b) => a + b, 0) / times.length;
  const minDispatchMs = Math.min(...times);
  const gflops = (2 * M * N * K) / (avgMs * 1e6);

  return { avgMs, gflops, minDispatchMs, initMs, runs: numRuns };
}

// ---------------------------------------------------------------------------
// Metric display component
// ---------------------------------------------------------------------------

function MetricRow({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string | null;
  unit?: string;
  highlight?: "better" | "worse" | null;
}) {
  const color =
    highlight === "better"
      ? "text-emerald-600"
      : highlight === "worse"
      ? "text-red-500"
      : "";

  return (
    <div className="flex items-baseline justify-between gap-2 py-2 border-b last:border-0" style={{ borderColor: "var(--card-border)" }}>
      <span className="text-muted text-sm">{label}</span>
      {value !== null ? (
        <span className={`font-mono font-bold text-base ${color}`}>
          {value}
          {unit && <span className="text-muted text-xs ml-1">{unit}</span>}
        </span>
      ) : (
        <span className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>—</span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel component for each competitor
// ---------------------------------------------------------------------------

function BenchPanel({
  label,
  sublabel,
  accentColor,
  accentBg,
  accentBorder,
  badgeBg,
  badgeText,
  btnClass,
  state,
  result,
  error,
  onRun,
  compareResult,
  isWinner,
  isLoser,
}: {
  label: string;
  sublabel: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  btnClass: string;
  state: BenchState;
  result: BenchResult | null;
  error: string | null;
  onRun: () => void;
  compareResult: BenchResult | null;
  isWinner: boolean;
  isLoser: boolean;
}) {
  const isRunning = state === "running";

  const avgHighlight: "better" | "worse" | null =
    result && compareResult
      ? isWinner
        ? "better"
        : "worse"
      : null;

  const gflopsHighlight: "better" | "worse" | null =
    result && compareResult
      ? isWinner
        ? "better"
        : "worse"
      : null;

  return (
    <div
      className="card card--outline relative overflow-hidden"
      style={{ borderColor: isWinner ? accentBorder : undefined, borderWidth: isWinner ? 2 : undefined }}
    >
      {/* Winner ribbon */}
      {isWinner && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          FASTER
        </div>
      )}
      {isLoser && (
        <div className="absolute top-0 right-0 bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
          SLOWER
        </div>
      )}

      {/* Header */}
      <div className="pb-4 mb-4" style={{ borderBottom: "1px solid var(--card-border)" }}>
        <div className="flex items-start gap-3">
          <div className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest ${badgeBg} ${badgeText}`}>
            {label}
          </div>
        </div>
        <p className="text-muted text-xs mt-2 leading-relaxed">{sublabel}</p>
      </div>

      {/* Metrics */}
      <div className="mb-4">
        <MetricRow
          label="Avg Time"
          value={result ? result.avgMs.toFixed(2) : null}
          unit="ms"
          highlight={avgHighlight}
        />
        <MetricRow
          label="GFLOPS"
          value={result ? result.gflops.toFixed(1) : null}
          highlight={gflopsHighlight}
        />
        <MetricRow
          label="Min Dispatch"
          value={result ? result.minDispatchMs.toFixed(2) : null}
          unit="ms"
        />
        <MetricRow
          label={label === "MindLang" ? "Shader Compile" : "Session Init"}
          value={result ? result.initMs.toFixed(1) : null}
          unit="ms"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono leading-relaxed">
          {error}
        </div>
      )}

      {/* Action button */}
      <button
        onClick={onRun}
        disabled={isRunning}
        className={`btn w-full justify-center text-sm ${
          isRunning
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : btnClass
        }`}
      >
        {isRunning ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Running...
          </span>
        ) : state === "done" ? (
          "Re-run"
        ) : (
          "Run Benchmark"
        )}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// GPU info display
// ---------------------------------------------------------------------------

function GpuInfo({ info }: { info: string | null }) {
  if (!info) return null;
  return (
    <div className="flex items-center gap-2 text-xs text-muted font-mono">
      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
      {info}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Log output area
// ---------------------------------------------------------------------------

function LogOutput({ lines }: { lines: string[] }) {
  return (
    <div className="rounded-lg font-mono text-xs h-48 overflow-y-auto p-3 leading-relaxed" style={{ background: "#0f172a", color: "#94a3b8" }}>
      {lines.length === 0 ? (
        <span style={{ color: "#475569" }}>Output will appear here...</span>
      ) : (
        lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            <span style={{ color: "#475569" }} className="select-none">{String(i + 1).padStart(3, " ")} </span>
            {line}
          </div>
        ))
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Speedup Banner
// ---------------------------------------------------------------------------

function SpeedupBanner({
  mindResult,
  onnxResult,
}: {
  mindResult: BenchResult;
  onnxResult: BenchResult;
}) {
  const ratio = onnxResult.avgMs / mindResult.avgMs;
  const mindFaster = ratio > 1;
  const displayRatio = mindFaster ? ratio : 1 / ratio;
  const winner = mindFaster ? "MindLang" : "ONNX RT Web";
  const winnerColor = mindFaster ? "text-blue-700" : "text-amber-600";

  return (
    <div className="card card--outline text-center">
      <p className="text-muted text-sm mb-2">Speedup</p>
      <div className={`text-5xl font-black font-mono ${winnerColor} mb-1`}>
        {displayRatio.toFixed(2)}x
      </div>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        <span className={winnerColor}>{winner}</span> is faster on this GPU
      </p>
      <div className="mt-4 flex items-center gap-3 justify-center text-xs text-muted font-mono">
        <span>
          <span className="text-blue-600 font-bold">ML</span> {mindResult.avgMs.toFixed(2)} ms
        </span>
        <span>&middot;</span>
        <span>
          <span className="text-amber-600 font-bold">OX</span> {onnxResult.avgMs.toFixed(2)} ms
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Source code link cards
// ---------------------------------------------------------------------------

function SourceCard({
  title,
  href,
  description,
  accentColor,
}: {
  title: string;
  href: string;
  description: string;
  accentColor: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card card--outline group no-underline"
    >
      <div className={`text-xs font-bold font-mono mb-1 ${accentColor}`}>{title}</div>
      <p className="text-muted text-xs leading-relaxed group-hover:text-foreground transition-colors !mb-0">
        {description}
      </p>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Config controls
// ---------------------------------------------------------------------------

const SIZE_OPTIONS = [
  { label: "1024", value: 1024 },
  { label: "2048", value: 2048 },
  { label: "4096", value: 4096 },
];

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function GemmBenchPage() {
  const [matrixSize, setMatrixSize] = useState(1024);
  const [numRuns, setNumRuns] = useState(5);
  const [gpuInfo, setGpuInfo] = useState<string | null>(null);

  const [mindState, setMindState] = useState<SideState>({ state: "idle", result: null, error: null });
  const [onnxState, setOnnxState] = useState<SideState>({ state: "idle", result: null, error: null });

  const [mindLog, setMindLog] = useState<string[]>([]);
  const [onnxLog, setOnnxLog] = useState<string[]>([]);

  const [activeLog, setActiveLog] = useState<"mind" | "onnx">("mind");

  const mindLogRef = useRef<string[]>([]);
  const onnxLogRef = useRef<string[]>([]);

  const appendMindLog = useCallback((msg: string) => {
    mindLogRef.current = [...mindLogRef.current, msg];
    setMindLog([...mindLogRef.current]);
  }, []);

  const appendOnnxLog = useCallback((msg: string) => {
    onnxLogRef.current = [...onnxLogRef.current, msg];
    setOnnxLog([...onnxLogRef.current]);
  }, []);

  const runMindLang = useCallback(async () => {
    mindLogRef.current = [];
    setMindLog([]);
    setMindState({ state: "running", result: null, error: null });
    setActiveLog("mind");

    try {
      if (!gpuInfo && navigator.gpu) {
        const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
        if (adapter?.info?.device) setGpuInfo(adapter.info.device);
        else if (adapter) setGpuInfo(adapter.info?.description ?? "WebGPU GPU");
      }

      const M = matrixSize;
      const result = await benchMindLang(M, M, M, numRuns, appendMindLog);
      setMindState({ state: "done", result, error: null });
      appendMindLog(`Done. Avg: ${result.avgMs.toFixed(2)} ms | ${result.gflops.toFixed(1)} GFLOPS`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMindState({ state: "error", result: null, error: msg });
      appendMindLog(`ERROR: ${msg}`);
    }
  }, [matrixSize, numRuns, gpuInfo, appendMindLog]);

  const runOnnx = useCallback(async () => {
    onnxLogRef.current = [];
    setOnnxLog([]);
    setOnnxState({ state: "running", result: null, error: null });
    setActiveLog("onnx");

    try {
      const M = matrixSize;
      const result = await benchOnnxWeb(M, M, M, numRuns, appendOnnxLog);
      setOnnxState({ state: "done", result, error: null });
      appendOnnxLog(`Done. Avg: ${result.avgMs.toFixed(2)} ms | ${result.gflops.toFixed(1)} GFLOPS`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setOnnxState({ state: "error", result: null, error: msg });
      appendOnnxLog(`ERROR: ${msg}`);
    }
  }, [matrixSize, numRuns, appendOnnxLog]);

  const runBoth = useCallback(async () => {
    mindLogRef.current = [];
    onnxLogRef.current = [];
    setMindLog([]);
    setOnnxLog([]);
    setMindState({ state: "running", result: null, error: null });
    setOnnxState({ state: "running", result: null, error: null });
    setActiveLog("mind");

    // Run sequentially to avoid GPU contention
    try {
      const M = matrixSize;

      if (!gpuInfo && navigator.gpu) {
        const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
        if (adapter?.info?.device) setGpuInfo(adapter.info.device);
        else if (adapter) setGpuInfo(adapter.info?.description ?? "WebGPU GPU");
      }

      appendMindLog("--- MindLang ---");
      const mResult = await benchMindLang(M, M, M, numRuns, appendMindLog);
      setMindState({ state: "done", result: mResult, error: null });
      appendMindLog(`Done. Avg: ${mResult.avgMs.toFixed(2)} ms | ${mResult.gflops.toFixed(1)} GFLOPS`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMindState({ state: "error", result: null, error: msg });
      appendMindLog(`ERROR: ${msg}`);
    }

    setActiveLog("onnx");

    try {
      const M = matrixSize;
      appendOnnxLog("--- ONNX Runtime Web ---");
      const oResult = await benchOnnxWeb(M, M, M, numRuns, appendOnnxLog);
      setOnnxState({ state: "done", result: oResult, error: null });
      appendOnnxLog(`Done. Avg: ${oResult.avgMs.toFixed(2)} ms | ${oResult.gflops.toFixed(1)} GFLOPS`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setOnnxState({ state: "error", result: null, error: msg });
      appendOnnxLog(`ERROR: ${msg}`);
    }
  }, [matrixSize, numRuns, gpuInfo, appendMindLog, appendOnnxLog]);

  const bothDone = mindState.state === "done" && onnxState.state === "done";
  const eitherRunning = mindState.state === "running" || onnxState.state === "running";

  const mindWins =
    bothDone &&
    mindState.result !== null &&
    onnxState.result !== null &&
    mindState.result.avgMs < onnxState.result.avgMs;

  const onnxWins =
    bothDone &&
    mindState.result !== null &&
    onnxState.result !== null &&
    onnxState.result.avgMs < mindState.result.avgMs;

  const activeLogLines = activeLog === "mind" ? mindLog : onnxLog;

  const flops = 2 * matrixSize * matrixSize * matrixSize;
  const flopsStr =
    flops >= 1e12
      ? `${(flops / 1e12).toFixed(1)} TFLOP`
      : `${(flops / 1e9).toFixed(0)} GFLOP`;

  return (
    <>
      {/* Breadcrumb bar */}
      <div style={{ borderBottom: "1px solid var(--card-border)" }}>
        <div className="container flex items-center gap-3 py-3">
          <Link href="/bench" className="text-muted text-sm no-underline hover:text-foreground transition-colors">
            Benchmarks
          </Link>
          <span className="text-muted">/</span>
          <span className="text-sm font-medium">GEMM</span>
          <div className="ml-auto">
            <GpuInfo info={gpuInfo} />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Title */}
          <div className="mb-8">
            <p className="eyebrow">WebGPU Benchmark</p>
            <h1 className="page-title">GEMM — Matrix Multiplication</h1>
            <p className="text-muted max-w-2xl leading-relaxed">
              Apples-to-apples comparison: MindLang AOT-compiled WGSL shader vs ONNX Runtime
              Web&apos;s WebGPU backend. Same operation ({matrixSize}&times;{matrixSize} GEMM),
              same GPU, same browser — {flopsStr} of floating-point work per run.
            </p>
          </div>

          {/* Config bar */}
          <div className="card card--outline p-4 mb-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="text-muted text-xs font-medium uppercase tracking-wide whitespace-nowrap">
                Matrix Size
              </label>
              <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--card-border)" }}>
                {SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setMatrixSize(opt.value)}
                    disabled={eitherRunning}
                    className={`px-3 py-1.5 text-xs font-mono font-bold transition-colors ${
                      matrixSize === opt.value
                        ? "text-white"
                        : "hover:bg-gray-100"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      background: matrixSize === opt.value ? "var(--color-primary)" : "var(--card-background)",
                      color: matrixSize === opt.value ? "white" : undefined,
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-muted text-xs font-medium uppercase tracking-wide whitespace-nowrap">
                Runs
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={numRuns}
                disabled={eitherRunning}
                onChange={(e) => setNumRuns(Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)))}
                className="w-16 px-2 py-1.5 rounded-lg text-xs font-mono text-center focus:outline-none disabled:opacity-50"
                style={{
                  background: "var(--code-background)",
                  border: "1px solid var(--card-border)",
                }}
              />
            </div>

            <div className="ml-auto">
              <button
                onClick={runBoth}
                disabled={eitherRunning}
                className="btn btn--primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {eitherRunning ? "Running..." : "Run Both"}
              </button>
            </div>
          </div>

          {/* Speedup banner */}
          {bothDone && mindState.result && onnxState.result && (
            <div className="mb-6">
              <SpeedupBanner mindResult={mindState.result} onnxResult={onnxState.result} />
            </div>
          )}

          {/* Split panels */}
          <div className="grid grid--two mb-6">
            <BenchPanel
              label="MindLang"
              sublabel="AOT-compiled WGSL via mindc --target webgpu. Fetches pre-compiled gemm.wgsl, creates compute pipeline, and dispatches 16x16 workgroups directly."
              accentColor="text-blue-600"
              accentBg="bg-blue-50"
              accentBorder="hsl(238deg 100% 50%)"
              badgeBg="bg-blue-100"
              badgeText="text-blue-700"
              btnClass="btn--primary"
              state={mindState.state}
              result={mindState.result}
              error={mindState.error}
              onRun={runMindLang}
              compareResult={onnxState.result}
              isWinner={mindWins}
              isLoser={onnxWins}
            />

            <BenchPanel
              label="ONNX RT Web"
              sublabel="ONNX Runtime Web 1.21 with WebGPU execution provider. Loads a validated MatMul model, creates InferenceSession, and runs inference."
              accentColor="text-amber-600"
              accentBg="bg-amber-50"
              accentBorder="hsl(38deg 92% 50%)"
              badgeBg="bg-amber-100"
              badgeText="text-amber-700"
              btnClass="bg-amber-500 text-white hover:bg-amber-600"
              state={onnxState.state}
              result={onnxState.result}
              error={onnxState.error}
              onRun={runOnnx}
              compareResult={mindState.result}
              isWinner={onnxWins}
              isLoser={mindWins}
            />
          </div>

          {/* Log output */}
          <div className="card card--outline p-4 mb-6">
            <div className="flex items-center gap-1 mb-3">
              <button
                onClick={() => setActiveLog("mind")}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                  activeLog === "mind"
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "text-muted hover:text-foreground"
                }`}
              >
                MindLang log
              </button>
              <button
                onClick={() => setActiveLog("onnx")}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                  activeLog === "onnx"
                    ? "bg-amber-100 text-amber-700 border border-amber-300"
                    : "text-muted hover:text-foreground"
                }`}
              >
                ONNX log
              </button>
            </div>
            <LogOutput lines={activeLogLines} />
          </div>

          {/* Source code links */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-muted uppercase tracking-widest mb-3">
              Source Code
            </h2>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <SourceCard
                title="gemm.mind"
                href="/bench/gemm/gemm.mind"
                description="MindLang source — tiled GEMM kernel with static tensor types, shared memory tiles, and workgroup barrier synchronization."
                accentColor="text-blue-600"
              />
              <SourceCard
                title="gemm.wgsl"
                href="/bench/gemm/gemm.wgsl"
                description="Compiled WGSL output from mindc. This is exactly what runs on your GPU — no runtime JIT, no graph construction overhead."
                accentColor="text-blue-500"
              />
              <SourceCard
                title="mind.toml"
                href="/bench/gemm/mind.toml"
                description="MIND project manifest. Declares the WebGPU target, 16x16 workgroup size, and high-performance power preference."
                accentColor="text-muted"
              />
            </div>
          </div>

          {/* Methodology note */}
          <div className="card card--outline text-xs leading-relaxed" style={{ background: "var(--background-alt)" }}>
            <p className="font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Methodology</p>
            <p className="text-muted mb-2">
              Both paths perform the identical mathematical operation: C = A &times; B where A, B, C
              are {matrixSize}&times;{matrixSize} f32 matrices. Each run includes 1 warmup dispatch
              (not counted) followed by {numRuns} timed dispatches with{" "}
              <code>queue.onSubmittedWorkDone()</code>{" "}
              synchronization between each.
            </p>
            <p className="text-muted mb-2">
              <span className="text-blue-600 font-bold">MindLang</span> uses a pre-compiled WGSL
              compute shader fetched from <code>/bench/gemm/gemm.wgsl</code>.
              Shader compile time is measured separately and not included in the dispatch average.
            </p>
            <p className="text-muted mb-2">
              <span className="text-amber-600 font-bold">ONNX Runtime Web</span> v1.21 uses the WebGPU
              execution provider. A validated single-node MatMul ONNX model with dynamic shapes is
              fetched from <code>/bench/gemm/matmul.onnx</code>. Session init time (including ONNX graph
              compilation to WGSL) is measured separately.
            </p>
            <p className="text-muted">
              Results vary by GPU, driver version, browser, and system load. Requires Chrome 113+,
              Edge 113+, or another browser with WebGPU enabled.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
