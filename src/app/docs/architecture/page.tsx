import { Metadata } from "next";
import Link from "next/link";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Compiler Architecture: MIND vs PyTorch 2.0",
    description: "A deep architectural comparison of the MIND compilation pipeline versus PyTorch 2.0's TorchDynamo/TorchInductor stack — why direct compilation eliminates entire categories of overhead.",
};

export default function ArchitecturePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/architecture" />
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/architecture" />
                    <h1 className="page-title mt-4">Compiler Architecture: MIND vs PyTorch 2.0</h1>

                    <div className="prose max-w-none">
                        <p className="text-lg text-muted mb-8">
                            PyTorch 2.0 introduced <code>torch.compile</code> to bring compilation benefits to Python-first ML.
                            MIND takes a fundamentally different approach: a purpose-built language with a direct compilation pipeline.
                            This document compares the two architectures and explains why the design differences matter.
                        </p>

                        {/* ── Pipeline Overview ── */}
                        <h2 className="text-2xl font-bold font-heading mt-12 mb-6">Pipeline Overview</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                            {/* PyTorch Pipeline */}
                            <div className="rounded-xl border border-card-border p-6 bg-card-background">
                                <h3 className="text-lg font-bold mb-4 text-orange-600">PyTorch 2.0 Pipeline</h3>
                                <div className="space-y-3">
                                    {[
                                        { stage: "Python Source", desc: "Dynamic Python code with tensor ops", color: "bg-orange-100 text-orange-800 border-orange-200" },
                                        { stage: "TorchDynamo", desc: "CPython bytecode interception via PEP 523", color: "bg-orange-50 text-orange-700 border-orange-200" },
                                        { stage: "FX Graph", desc: "Traced computation graph (may fail on dynamic control flow)", color: "bg-orange-50 text-orange-700 border-orange-200" },
                                        { stage: "ATen / Prim IR", desc: "~2,000+ operators decomposed to primitives", color: "bg-orange-50 text-orange-700 border-orange-200" },
                                        { stage: "TorchInductor", desc: "Loop-level IR generation (Triton for GPU, C++ for CPU)", color: "bg-orange-50 text-orange-700 border-orange-200" },
                                        { stage: "Triton / CUDA", desc: "JIT-compiled GPU kernels", color: "bg-orange-100 text-orange-800 border-orange-200" },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className={`rounded-lg border px-4 py-2.5 ${item.color}`}>
                                                <div className="font-semibold text-sm">{item.stage}</div>
                                                <div className="text-xs opacity-80">{item.desc}</div>
                                            </div>
                                            {i < 5 && (
                                                <div className="flex justify-center my-1">
                                                    <svg width="12" height="16" viewBox="0 0 12 16" className="text-orange-300">
                                                        <path d="M6 0 L6 12 L2 8 M6 12 L10 8" stroke="currentColor" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-xs text-muted">
                                    6 stages &middot; JIT compilation &middot; Python runtime required &middot; 99&ndash;878 ms cold start
                                </div>
                            </div>

                            {/* MIND Pipeline */}
                            <div className="rounded-xl border border-primary/30 p-6 bg-primary/5">
                                <h3 className="text-lg font-bold mb-4 text-primary">MIND Pipeline</h3>
                                <div className="space-y-3">
                                    {[
                                        { stage: "MIND Source", desc: "Tensor-native syntax with static types and shapes", color: "bg-blue-100 text-blue-800 border-blue-200" },
                                        { stage: "AST", desc: "Hand-written recursive descent parser (zero allocations)", color: "bg-blue-50 text-blue-700 border-blue-200" },
                                        { stage: "Typed AST", desc: "Full type + shape inference, all errors caught here", color: "bg-blue-50 text-blue-700 border-blue-200" },
                                        { stage: "MIND IR (SSA)", desc: "19 core ops in static single assignment form", color: "bg-blue-50 text-blue-700 border-blue-200" },
                                        { stage: "MLIR Dialects", desc: "Direct lowering to linalg / tensor / arith dialects", color: "bg-blue-50 text-blue-700 border-blue-200" },
                                        { stage: "LLVM IR / Execution", desc: "AOT native code or JIT via LLVM backend", color: "bg-blue-100 text-blue-800 border-blue-200" },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className={`rounded-lg border px-4 py-2.5 ${item.color}`}>
                                                <div className="font-semibold text-sm">{item.stage}</div>
                                                <div className="text-xs opacity-80">{item.desc}</div>
                                            </div>
                                            {i < 5 && (
                                                <div className="flex justify-center my-1">
                                                    <svg width="12" height="16" viewBox="0 0 12 16" className="text-blue-300">
                                                        <path d="M6 0 L6 12 L2 8 M6 12 L10 8" stroke="currentColor" strokeWidth="2" fill="none" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-xs text-muted">
                                    6 stages &middot; AOT compilation &middot; No runtime dependency &middot; 1.8&ndash;15.5 &micro;s total
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 mb-10 text-sm">
                            <strong className="text-amber-800">Scope note:</strong>{" "}
                            <span className="text-amber-700">
                                MIND benchmarks measure frontend compilation (parse &rarr; typecheck &rarr; IR generation).
                                PyTorch times measure <code>torch.compile</code> cold-start (TorchDynamo + TorchInductor + Triton codegen).
                                These are different scopes of work &mdash; MIND&rsquo;s pipeline is narrower by design, which is the architectural point.
                            </span>
                        </div>

                        {/* ── Section 1: Frontend ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-4" id="frontend">1. Frontend: Direct Parse vs Bytecode Interception</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold text-orange-600 mb-2">PyTorch: TorchDynamo</h4>
                                <p className="text-sm text-muted">
                                    TorchDynamo intercepts CPython bytecode at runtime using PEP 523 frame evaluation hooks.
                                    It &ldquo;sniffs&rdquo; Python execution, captures tensor operations into an FX graph, and falls back
                                    to the Python interpreter for unsupported patterns (&ldquo;graph breaks&rdquo;).
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>Must handle arbitrary Python: closures, exceptions, generators, metaclasses</li>
                                    <li>Graph breaks fragment compilation into multiple subgraphs</li>
                                    <li>Guard system re-validates assumptions on every call</li>
                                    <li>Tracing overhead proportional to Python complexity</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-2">MIND: Recursive Descent Parser</h4>
                                <p className="text-sm text-muted">
                                    MIND has a hand-written recursive descent parser that directly reads source code into an AST.
                                    No tracing, no bytecode interception, no Python runtime. The parser is a single-pass,
                                    zero-allocation Rust function.
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>Deterministic: same source always produces same AST</li>
                                    <li>No graph breaks &mdash; the entire program is always compiled</li>
                                    <li>No guard overhead &mdash; types are statically known</li>
                                    <li>Parser throughput: ~338,000 compilations/sec</li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-muted mb-8">
                            The fundamental difference: PyTorch must <em>discover</em> the computation graph by running Python.
                            MIND <em>declares</em> it in source code. Discovery is inherently more expensive than declaration.
                        </p>

                        {/* ── Section 2: Type/Shape System ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-4" id="types">2. Type and Shape System</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold text-orange-600 mb-2">PyTorch: Runtime Shape Discovery</h4>
                                <p className="text-sm text-muted">
                                    PyTorch tensors carry shape and dtype information at runtime. TorchDynamo captures these
                                    as &ldquo;guards&rdquo; &mdash; runtime assertions that the shapes haven&rsquo;t changed since tracing.
                                    If a guard fails, the entire graph is re-traced and re-compiled.
                                </p>
                                <div className="mt-3 p-3 bg-slate-50 rounded text-xs font-mono">
                                    <div className="text-muted"># PyTorch: shapes discovered at runtime</div>
                                    <div>x = torch.randn(batch, 784)</div>
                                    <div>y = model(x)  <span className="text-muted"># shape checked at runtime</span></div>
                                    <div className="text-red-500 mt-1"># RuntimeError: shape mismatch</div>
                                    <div className="text-red-500"># (only discovered during execution)</div>
                                </div>
                            </div>
                            <div className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-2">MIND: Compile-Time Shape Resolution</h4>
                                <p className="text-sm text-muted">
                                    MIND encodes tensor shapes directly in the type system. The type checker resolves all shapes
                                    at compile time using a shape algebra that supports broadcasting, dimension propagation,
                                    and reduction inference. Shape mismatches are compile errors.
                                </p>
                                <div className="mt-3 p-3 bg-blue-50 rounded text-xs font-mono">
                                    <div className="text-muted">// MIND: shapes verified at compile time</div>
                                    <div>let x: Tensor&lt;[batch, 784], f32&gt; = input;</div>
                                    <div>let y = matmul(x, w);  <span className="text-muted">// shape checked now</span></div>
                                    <div className="text-green-600 mt-1">// E2102: shape mismatch</div>
                                    <div className="text-green-600">// (caught before any code runs)</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted mb-8">
                            Compile-time shape checking eliminates an entire category of production failures.
                            In PyTorch, a shape mismatch in an inference path that only triggers on certain inputs
                            can reach production. In MIND, it cannot compile.
                        </p>

                        {/* ── Section 3: IR Design ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-4" id="ir">3. Intermediate Representation</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold text-orange-600 mb-2">PyTorch: ATen + Prim IR</h4>
                                <p className="text-sm text-muted mb-3">
                                    PyTorch&rsquo;s FX graph uses ATen operators (~2,000+) that must be decomposed into a smaller
                                    Prim IR for optimization. The decomposition is non-trivial: each ATen op may expand to
                                    dozens of Prim ops. This large surface area makes optimization harder and slower.
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">~2,000+</div>
                                        <div className="text-xs text-muted">ATen operators</div>
                                    </div>
                                    <div className="text-muted">&rarr;</div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">~250</div>
                                        <div className="text-xs text-muted">Prim IR ops</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-2">MIND: Purpose-Built SSA IR</h4>
                                <p className="text-sm text-muted mb-3">
                                    MIND IR is a minimal, purpose-built static single assignment (SSA) form with exactly 19 core operations.
                                    Every operation has precise, formally specified semantics. The small surface area makes
                                    optimization fast, verification tractable, and the entire IR auditable.
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">19</div>
                                        <div className="text-xs text-muted">Core IR ops</div>
                                    </div>
                                    <div className="text-muted">&rarr;</div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">SSA</div>
                                        <div className="text-xs text-muted">Formally verified</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted mb-8">
                            The ratio matters: optimizing across 19 operations is a tractable problem.
                            Optimizing across 2,000+ operators requires heuristics, decomposition passes,
                            and significant compile-time overhead. MIND&rsquo;s minimal IR is why compilation
                            takes microseconds, not seconds.
                        </p>

                        {/* ── Section 4: Lowering ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-4" id="lowering">4. Lowering Path</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold text-orange-600 mb-2">PyTorch: TorchInductor + Triton</h4>
                                <p className="text-sm text-muted">
                                    TorchInductor generates loop-level IR from the FX graph, then emits Triton kernels for GPU
                                    or OpenMP C++ for CPU. Triton itself runs another compilation pass (Triton &rarr; LLVM IR &rarr; PTX).
                                    The result: two full compilation pipelines stacked on top of each other.
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>FX Graph &rarr; TorchInductor loop IR &rarr; Triton source</li>
                                    <li>Triton source &rarr; Triton IR &rarr; LLVM IR &rarr; PTX</li>
                                    <li>Two independent optimization phases</li>
                                    <li>Cache invalidation across both layers</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-2">MIND: Direct MLIR &rarr; LLVM</h4>
                                <p className="text-sm text-muted">
                                    MIND IR lowers directly to MLIR&rsquo;s tensor and linalg dialects, then through
                                    the standard MLIR pipeline to LLVM IR. One unified lowering path, one optimization
                                    framework, one code generation backend.
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>MIND IR &rarr; MLIR linalg/tensor/arith &rarr; LLVM IR</li>
                                    <li>Single unified optimization pipeline</li>
                                    <li>No intermediate language boundaries</li>
                                    <li>Deterministic lowering at every stage</li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-muted mb-8">
                            PyTorch&rsquo;s two-layer compilation (TorchInductor + Triton) exists because it must bridge
                            from Python semantics to GPU kernels incrementally. MIND&rsquo;s direct path exists because
                            the source language was designed for compilation from the start.
                        </p>

                        {/* ── Section 5: Autodiff ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-4" id="autodiff">5. Automatic Differentiation</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold text-orange-600 mb-2">PyTorch: Runtime Tape (Autograd)</h4>
                                <p className="text-sm text-muted">
                                    PyTorch records a computation graph (the &ldquo;tape&rdquo;) during the forward pass.
                                    On <code>.backward()</code>, it replays the tape in reverse to compute gradients.
                                    This recording happens <strong>on every forward pass</strong>, every iteration, every batch.
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>Tape recorded per-iteration (memory + time overhead)</li>
                                    <li>Graph nodes allocated on heap during forward pass</li>
                                    <li>Gradient computation interleaved with Python GC</li>
                                    <li>torch.compile partially addresses this via AOTAutograd</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-2">MIND: Compile-Time Autodiff</h4>
                                <p className="text-sm text-muted">
                                    MIND performs automatic differentiation as a compiler transform on the IR.
                                    The gradient function is generated <strong>once at compile time</strong> and emitted as native code.
                                    No tape, no per-iteration allocation, no runtime overhead.
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>Gradient code generated once, compiled to native binary</li>
                                    <li>Zero per-iteration overhead for gradient computation</li>
                                    <li>Compile-time optimization of the gradient graph</li>
                                    <li>~38 &micro;s one-time generation cost (amortized to zero)</li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-muted mb-8">
                            Over a typical training run of 100,000 iterations, the difference compounds.
                            PyTorch builds and destroys the autograd tape 100,000 times.
                            MIND generates the gradient function once at compile time and calls it as a native function.
                        </p>

                        {/* ── Section 6: Determinism ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-4" id="determinism">6. Determinism</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold text-orange-600 mb-2">PyTorch: Best-Effort</h4>
                                <p className="text-sm text-muted">
                                    PyTorch offers <code>torch.use_deterministic_algorithms(True)</code> but this disables
                                    many optimized kernels and is not guaranteed across hardware or CUDA versions.
                                    TorchDynamo&rsquo;s guard system introduces non-determinism in compilation &mdash;
                                    different execution paths can produce different compiled graphs.
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>Deterministic mode disables fast kernels</li>
                                    <li>No bit-level build reproducibility guarantee</li>
                                    <li>Graph structure depends on execution order</li>
                                    <li>Tracing-based compilation is inherently path-dependent</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-2">MIND: Guaranteed Bit-Level</h4>
                                <p className="text-sm text-muted">
                                    MIND guarantees 100% bit-level reproducibility: same source &rarr; same IR &rarr; same binary.
                                    Verified via SHA-256 cryptographic hashing across 40 compilation runs
                                    with 4 test programs. Zero hash collisions.
                                </p>
                                <ul className="list text-sm mt-3">
                                    <li>SHA-256 verified: identical output on every compilation</li>
                                    <li>No execution-dependent graph construction</li>
                                    <li>Determinism without disabling optimizations</li>
                                    <li>Enables audit trails for regulated industries</li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-muted mb-8">
                            Determinism is not a feature flag in MIND &mdash; it&rsquo;s a structural property of the compiler architecture.
                            Because there is no tracing and no runtime-dependent graph construction,
                            the output is deterministic by construction, not by enforcement.
                        </p>

                        {/* ── Performance Impact ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="performance">Measured Performance Impact</h2>

                        <p className="text-muted mb-6">
                            These architectural differences produce measurable results.
                            All numbers from verified benchmarks on the same reference platform
                            (Ubuntu 24.04, Intel i7-5930K, RTX 3080, CUDA 12.8):
                        </p>

                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-card-border">
                                        <th className="text-left py-3 pr-6 font-bold">Metric</th>
                                        <th className="text-center py-3 px-4 font-bold text-primary bg-primary/5">MIND v0.2.1</th>
                                        <th className="text-center py-3 px-4 font-bold text-muted">PyTorch 2.10</th>
                                        <th className="text-center py-3 px-4 font-bold text-muted">Ratio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-card-border">
                                        <td className="py-3 pr-6 font-medium">Compilation (scalar_math)</td>
                                        <td className="py-3 px-4 text-center bg-primary/5 font-semibold">1.77 &micro;s</td>
                                        <td className="py-3 px-4 text-center text-muted">99 ms</td>
                                        <td className="py-3 px-4 text-center font-bold text-primary">56,000&times;</td>
                                    </tr>
                                    <tr className="border-b border-card-border">
                                        <td className="py-3 pr-6 font-medium">Compilation (conv2d)</td>
                                        <td className="py-3 px-4 text-center bg-primary/5 font-semibold">~5 &micro;s</td>
                                        <td className="py-3 px-4 text-center text-muted">878 ms</td>
                                        <td className="py-3 px-4 text-center font-bold text-primary">176,000&times;</td>
                                    </tr>
                                    <tr className="border-b border-card-border">
                                        <td className="py-3 pr-6 font-medium">Compilation (large network)</td>
                                        <td className="py-3 px-4 text-center bg-primary/5 font-semibold">15.5 &micro;s</td>
                                        <td className="py-3 px-4 text-center text-muted">752 ms</td>
                                        <td className="py-3 px-4 text-center font-bold text-primary">48,500&times;</td>
                                    </tr>
                                    <tr className="border-b border-card-border">
                                        <td className="py-3 pr-6 font-medium">Determinism</td>
                                        <td className="py-3 px-4 text-center bg-primary/5 font-semibold">100% (SHA-256)</td>
                                        <td className="py-3 px-4 text-center text-muted">Not guaranteed</td>
                                        <td className="py-3 px-4 text-center">&mdash;</td>
                                    </tr>
                                    <tr className="border-b border-card-border">
                                        <td className="py-3 pr-6 font-medium">Autodiff overhead</td>
                                        <td className="py-3 px-4 text-center bg-primary/5 font-semibold">0 (compiled)</td>
                                        <td className="py-3 px-4 text-center text-muted">Per-iteration tape</td>
                                        <td className="py-3 px-4 text-center">&mdash;</td>
                                    </tr>
                                    <tr className="border-b border-card-border">
                                        <td className="py-3 pr-6 font-medium">IR surface area</td>
                                        <td className="py-3 px-4 text-center bg-primary/5 font-semibold">19 ops</td>
                                        <td className="py-3 px-4 text-center text-muted">~2,000+ ops</td>
                                        <td className="py-3 px-4 text-center font-bold text-primary">105&times; smaller</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-50 border border-card-border mb-10 text-sm text-muted">
                            <strong>Methodology:</strong> MIND compilation measured with Criterion.rs (100 samples, 95% CI, in-process).
                            PyTorch measured as <code>torch.compile</code> cold-start on GPU (RTX 3080, CUDA 12.8).
                            See <Link href="/docs/performance" className="text-primary hover:underline">Performance</Link> and{" "}
                            <Link href="/docs/guides/benchmarks" className="text-primary hover:underline">Running Benchmarks</Link> for
                            full methodology and reproduction instructions.
                        </div>

                        {/* ── Why This Matters ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="implications">Why This Matters</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold mb-2">For Development</h4>
                                <p className="text-sm text-muted">
                                    Microsecond compilation means instant feedback. Change a model definition,
                                    recompile in 2 &micro;s, catch shape errors before running any data.
                                    No waiting for <code>torch.compile</code> to warm up.
                                </p>
                            </div>
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold mb-2">For Production</h4>
                                <p className="text-sm text-muted">
                                    Bit-identical builds enable audit trails. Compile-time autodiff eliminates
                                    per-request overhead. No Python runtime in the deployment artifact.
                                    The binary is the deployment.
                                </p>
                            </div>
                            <div className="p-5 rounded-lg border border-card-border">
                                <h4 className="font-bold mb-2">For CI/CD</h4>
                                <p className="text-sm text-muted">
                                    At 338,000 compilations/sec, the entire test suite compiles in milliseconds.
                                    Shape errors become CI failures, not production incidents.
                                    Deterministic builds mean reproducible pipelines.
                                </p>
                            </div>
                        </div>

                        {/* ── The Rust Analogy ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-4" id="analogy">The Rust Analogy</h2>

                        <p className="text-muted mb-6">
                            Rust didn&rsquo;t make CPUs faster. It made everything <em>around</em> CPU execution safer and faster:
                            memory management, concurrency, build systems, deployment.
                            The CPU instructions themselves are the same.
                        </p>

                        <p className="text-muted mb-6">
                            MIND follows the same pattern. The GPU kernels hit the same silicon &mdash;
                            both MIND and PyTorch call into cuBLAS for matrix multiplication, and the results are at hardware parity.
                            What MIND eliminates is everything around the kernel execution:
                        </p>

                        <ul className="list mb-8">
                            <li><strong>Compilation overhead:</strong> microseconds vs seconds</li>
                            <li><strong>Shape validation:</strong> compile time vs runtime crashes</li>
                            <li><strong>Autodiff cost:</strong> zero per-iteration vs tape per-iteration</li>
                            <li><strong>Deployment artifact:</strong> native binary vs Python + CUDA runtime</li>
                            <li><strong>Build reproducibility:</strong> guaranteed vs best-effort</li>
                        </ul>

                        <p className="text-muted mb-10">
                            The result is a system where the total cost of running ML models
                            is dominated by the actual computation, not the framework overhead.
                        </p>

                        {/* ── CTA ── */}
                        <div className="mt-16 p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold font-heading mb-4 !text-white">Explore the Pipeline</h2>
                                <p className="!text-slate-300 mb-6 max-w-2xl">
                                    Dive deeper into MIND&rsquo;s compiler internals, run the benchmarks yourself,
                                    or see how the comparison plays out across frameworks.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/docs/ir" className="btn btn--primary">
                                        MIND IR Specification
                                    </Link>
                                    <Link href="/docs/mlir" className="btn btn--ghost !text-white !border-white/30 hover:!bg-white/10">
                                        MLIR Lowering
                                    </Link>
                                    <Link href="/compare" className="btn btn--ghost !text-white !border-white/30 hover:!bg-white/10">
                                        Framework Comparison
                                    </Link>
                                    <Link href="/docs/guides/benchmarks" className="btn btn--ghost !text-white !border-white/30 hover:!bg-white/10">
                                        Run Benchmarks
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        </div>
                    </div>

                    <PageNavigation
                        prev={{ label: "MLIR Lowering", href: "/docs/mlir" }}
                        next={{ label: "Runtime", href: "/docs/runtime" }}
                    />
                </main>
            </div>
        </div>
    );
}
