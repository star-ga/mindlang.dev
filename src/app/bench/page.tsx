import { Metadata } from "next";
import Link from "next/link";
import { Cpu, Zap, FileText, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Benchmarks",
  description: "MIND performance benchmarks: compiler speed vs PyTorch, WebGPU GEMM, MIC token efficiency, and MAP protocol overhead. Reproducible, verified results.",
};

export default function BenchPage() {
  return (
    <>
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow">Performance</p>
            <h1 className="!mb-6">Benchmarks</h1>
            <p className="hero-lede">
              Verified performance data across the MIND stack &mdash; compiler, runtime, serialization, and protocol.
              WebGPU benchmarks run in your browser. Compiler benchmarks are reproducible from source.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <div className="grid gap-6">
            <Link
              href="/bench/gemm"
              className="card card--outline group hover:border-primary/40 transition-all no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-50 shrink-0">
                  <Cpu className="w-7 h-7 text-cyan-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground m-0 group-hover:text-primary transition-colors">
                      GEMM — Matrix Multiplication
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-cyan-100 text-cyan-700">
                      WebGPU
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed m-0">
                    Tiled GEMM on WebGPU (1024&ndash;4096). Compares MindLang AOT-compiled WGSL
                    shaders against ONNX Runtime Web&apos;s WebGPU backend performing the identical
                    operation. Measures dispatch time, GFLOPS, and optionally includes compile overhead.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
                    <span className="text-emerald-600 font-bold">7&ndash;19x faster</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-emerald-600 font-bold">~4.5 TFLOPS peak</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">8&times;4 register tiling</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">f32 precision</span>
                  </div>
                </div>
                <div className="text-muted text-xl shrink-0 self-center group-hover:text-primary transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>
            {/* Compiler Performance — PyTorch */}
            <Link
              href="/docs/architecture#performance"
              className="card card--outline group hover:border-primary/40 transition-all no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 shrink-0">
                  <Zap className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground m-0 group-hover:text-primary transition-colors">
                      Compiler &mdash; MIND vs PyTorch 2.10
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                      Criterion.rs
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed m-0">
                    Frontend compilation (parse &rarr; typecheck &rarr; IR) vs PyTorch <code>torch.compile</code> full
                    cold-start pipeline. Ubuntu 24.04, i7-5930K, RTX 3080, CUDA 12.8.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
                    <span className="text-emerald-600 font-bold">35,000&ndash;176,000&times; faster</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">176,000&times; conv2d</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">122,000&times; simple_mlp</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">1.8&ndash;15.5 &micro;s frontend</span>
                  </div>
                </div>
                <div className="text-muted text-xl shrink-0 self-center group-hover:text-primary transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* Compiler Performance — Mojo */}
            <Link
              href="/docs/guides/benchmarks"
              className="card card--outline group hover:border-primary/40 transition-all no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 shrink-0">
                  <Zap className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground m-0 group-hover:text-primary transition-colors">
                      Compiler &mdash; MIND vs Mojo 0.26.1
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                      Criterion.rs
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed m-0">
                    Frontend compilation vs Mojo <code>mojo build</code> full LLVM compilation to native binary.
                    Same platform, February 2026 verified.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
                    <span className="text-emerald-600 font-bold">135,000&ndash;458,000&times; faster</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">458,000&times; scalar_math</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">280,000&times; matmul</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">135,000&times; mlp</span>
                  </div>
                </div>
                <div className="text-muted text-xl shrink-0 self-center group-hover:text-primary transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* Compiler Performance — JAX */}
            <Link
              href="/docs/guides/benchmarks"
              className="card card--outline group hover:border-primary/40 transition-all no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 shrink-0">
                  <Zap className="w-7 h-7 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground m-0 group-hover:text-primary transition-colors">
                      Compiler &mdash; MIND vs JAX 0.9
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                      Criterion.rs
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed m-0">
                    Frontend compilation vs JAX <code>jax.jit()</code> cold-start XLA compilation
                    (cache disabled). RTX 3080, CUDA 12.8, JAX 0.9.0.1.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
                    <span className="text-emerald-600 font-bold">21,200&ndash;95,100&times; faster</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">95,100&times; large_matmul</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">58,600&times; simple_mlp</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">43,100&times; small_matmul</span>
                  </div>
                </div>
                <div className="text-muted text-xl shrink-0 self-center group-hover:text-primary transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* MIC Token Efficiency */}
            <Link
              href="/docs/guides/benchmarks#mic-map-format-benchmark"
              className="card card--outline group hover:border-primary/40 transition-all no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-violet-50 shrink-0">
                  <FileText className="w-7 h-7 text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground m-0 group-hover:text-primary transition-colors">
                      MIC Format &mdash; Token Efficiency
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-violet-100 text-violet-700">
                      Serialization
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed m-0">
                    MIC (MIND IR Compact) format benchmarked against JSON, TOML, and TOON for
                    AI agent workflows. Measures token count, parse speed, and annual cost at GPT-5.2 pricing.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
                    <span className="text-violet-600 font-bold">5.3&times; fewer tokens vs JSON</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-violet-600 font-bold">$396/yr saved per 1M IRs</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">2.26 &micro;s parse</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">52 tokens</span>
                  </div>
                </div>
                <div className="text-muted text-xl shrink-0 self-center group-hover:text-primary transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* MAP Protocol */}
            <Link
              href="/docs/guides/benchmarks#mic-map-format-benchmark"
              className="card card--outline group hover:border-primary/40 transition-all no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-50 shrink-0">
                  <Radio className="w-7 h-7 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground m-0 group-hover:text-primary transition-colors">
                      MAP Protocol &mdash; Agent Communication
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-orange-100 text-orange-700">
                      Protocol
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed m-0">
                    MAP (MIND Agent Protocol) compared against JSON-RPC for AI agent session communication.
                    Measures wire size, token count, and per-session overhead.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
                    <span className="text-orange-600 font-bold">4.3&times; fewer tokens vs JSON-RPC</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-orange-600 font-bold">77% smaller wire size</span>
                    <span className="text-muted">&middot;</span>
                    <span className="text-muted">234 bytes vs 1,004</span>
                  </div>
                </div>
                <div className="text-muted text-xl shrink-0 self-center group-hover:text-primary transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/docs/guides/benchmarks" className="btn btn--primary">
              Reproduction guide
            </Link>
            <Link href="/docs/performance" className="btn btn--ghost">
              Performance overview
            </Link>
          </div>

          <p className="text-sm text-muted text-center mt-8">
            WebGPU benchmarks require Chrome 113+ or Edge 113+. Compiler benchmarks reproducible from{" "}
            <a href="https://github.com/star-ga/mind/tree/main/benchmarks" target="_blank" rel="noopener" className="text-primary hover:underline">source</a>.
            Results vary by hardware.
          </p>
        </div>
      </section>
    </>
  );
}
