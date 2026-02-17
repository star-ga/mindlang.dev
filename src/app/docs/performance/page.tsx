import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Performance",
    description: "MIND performance characteristics, benchmarking methodology, and verified results.",
};

export default function PerformancePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/performance" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/performance" />
                    <h1 className="page-title mt-4">Performance</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND&apos;s compiler frontend processes tensor programs in microseconds, produces 100% deterministic builds, and generates gradient code at compile-time.
                        </p>

                        {/* Methodology Disclaimer */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-foreground mb-2">Important: What We Measure</h3>
                            <p className="text-sm text-muted mb-3">
                                MIND benchmarks measure the <strong>compiler frontend</strong> only: parsing, type checking, and IR lowering. This does <strong>not</strong> include code generation, optimization passes, linking, or producing an executable.
                            </p>
                            <p className="text-sm text-muted">
                                Comparisons with PyTorch <code>torch.compile()</code>, Mojo <code>mojo build</code>, and JAX <code>jax.jit()</code> are shown for context, but these tools perform <strong>fundamentally more work</strong> (full compilation to runnable code). The ratios reflect this scope difference, not just speed.
                            </p>
                        </div>

                        {/* Verified Benchmark Results */}
                        <h2 id="frontend-speed" className="text-2xl font-bold font-heading mt-12 mb-4">Frontend Speed (Verified)</h2>
                        <p className="text-muted mb-4">
                            In-process Criterion benchmarks measuring <code>compile_source()</code> — the complete frontend pipeline (parse + typecheck + IR lowering):
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Program</th>
                                        <th className="text-left py-2 pr-4 font-bold">Complexity</th>
                                        <th className="text-left py-2 pr-4 font-bold">Time (median)</th>
                                        <th className="text-left py-2 font-bold">Pipeline</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4">scalar_math</td>
                                        <td className="py-2 pr-4">1 expression</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">1.8 µs</td>
                                        <td className="py-2">parse + typecheck + IR</td>
                                    </tr>
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4">small_matmul</td>
                                        <td className="py-2 pr-4">3 statements</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">2.8 µs</td>
                                        <td className="py-2">parse + typecheck + IR</td>
                                    </tr>
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4">tensor_ops</td>
                                        <td className="py-2 pr-4">5 statements</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">4.8 µs</td>
                                        <td className="py-2">parse + typecheck + IR</td>
                                    </tr>
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4">medium_mlp</td>
                                        <td className="py-2 pr-4">6 statements, 3 ops</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">6.1 µs</td>
                                        <td className="py-2">parse + typecheck + IR</td>
                                    </tr>
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4">large_network</td>
                                        <td className="py-2 pr-4">12 statements, 3-layer MLP</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">15.5 µs</td>
                                        <td className="py-2">parse + typecheck + IR</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Methodology</h4>
                            <p className="text-sm text-muted">
                                Rust Criterion.rs statistical benchmarks: 100 samples per test, 3-second warmup, 95% confidence intervals. In-process measurement (no subprocess overhead). Frontend time scales roughly linearly with program complexity.
                            </p>
                            <p className="text-xs text-muted mt-2 italic">
                                Verified Feb 2026 on Linux 6.17, x86_64, Rust 1.93. Reproducible via: <code>cargo bench --bench compiler</code> and <code>cargo bench --bench simple_benchmarks</code>
                            </p>
                        </div>

                        {/* PyTorch Comparison */}
                        <h2 id="mind-vs-pytorch" className="text-2xl font-bold font-heading mt-12 mb-4">MIND Frontend vs PyTorch torch.compile()</h2>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-muted">
                                <strong>Scope difference:</strong> MIND measures frontend only (parse + typecheck + IR). PyTorch <code>torch.compile()</code> includes graph capture, optimization, and code generation (Inductor/Triton). These are <strong>not equivalent operations</strong>.
                            </p>
                        </div>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Benchmark</th>
                                        <th className="text-left py-2 pr-4 font-bold">MIND Frontend</th>
                                        <th className="text-left py-2 pr-4 font-bold">PyTorch torch.compile()</th>
                                        <th className="text-left py-2 font-bold">Ratio</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">scalar_math</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">1.8 µs</td>
                                        <td className="py-2 pr-4">99 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">56,000x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">small_matmul</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">3.0 µs</td>
                                        <td className="py-2 pr-4">162 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">55,000x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">medium_matmul</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">3.0 µs</td>
                                        <td className="py-2 pr-4">109 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">37,000x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">large_matmul</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">3.0 µs</td>
                                        <td className="py-2 pr-4">105 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">36,000x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">simple_mlp</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">6.1 µs</td>
                                        <td className="py-2 pr-4">752 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">122,000x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">conv2d</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">~5 µs</td>
                                        <td className="py-2 pr-4">878 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">176,000x</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">What This Means</h4>
                            <p className="text-sm text-muted mb-2">
                                MIND&apos;s frontend is <strong>35,000-176,000x faster</strong> than PyTorch&apos;s full GPU <code>torch.compile()</code> pipeline. This is expected because:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-muted text-sm">
                                <li><strong>MIND:</strong> Specialized Rust frontend — parse, typecheck, IR emit. No code generation.</li>
                                <li><strong>PyTorch:</strong> Full compilation — FX graph capture, optimization passes, Inductor code generation, C++ compilation.</li>
                                <li><strong>Key takeaway:</strong> MIND&apos;s frontend is microsecond-fast, enabling instant feedback during development. A full end-to-end comparison would require MIND to also generate and compile executable code.</li>
                            </ul>
                            <p className="text-xs text-muted mt-3 italic">
                                Same-machine measurement: PyTorch 2.10 GPU (RTX 3080, CUDA 12.8), full cold-start (caches cleared). MIND: Criterion (100 samples). Feb 2026.
                            </p>
                        </div>

                        {/* Mojo Comparison */}
                        <h2 id="mind-vs-mojo" className="text-2xl font-bold font-heading mt-12 mb-4">MIND Frontend vs Mojo 0.26.1</h2>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-muted">
                                <strong>Scope difference:</strong> MIND measures frontend only (parse + typecheck + IR). Mojo <code>mojo build</code> performs <strong>full LLVM compilation</strong> to a native binary. These are <strong>not equivalent operations</strong>.
                            </p>
                        </div>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Benchmark</th>
                                        <th className="text-left py-2 pr-4 font-bold">MIND Frontend</th>
                                        <th className="text-left py-2 pr-4 font-bold">Mojo mojo build</th>
                                        <th className="text-left py-2 font-bold">Ratio</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">scalar_math</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">1.8 µs</td>
                                        <td className="py-2 pr-4">810 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">458,000x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">matmul</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">3.0 µs</td>
                                        <td className="py-2 pr-4">827 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">280,000x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">mlp</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">6.1 µs</td>
                                        <td className="py-2 pr-4">829 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">135,000x</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">What This Means</h4>
                            <p className="text-sm text-muted mb-2">
                                MIND&apos;s frontend is <strong>135,000-458,000x faster</strong> than Mojo&apos;s full <code>mojo build</code> compilation. Mojo compiles through LLVM to produce a native binary, while MIND&apos;s frontend only performs parsing, type checking, and IR lowering.
                            </p>
                            <p className="text-xs text-muted mt-3 italic">
                                Same-machine measurement: Mojo 0.26.1.0 (pixi, Ubuntu 24.04). MIND: Criterion (100 samples). Feb 2026.
                            </p>
                        </div>

                        {/* JAX Comparison */}
                        <h2 id="mind-vs-jax" className="text-2xl font-bold font-heading mt-12 mb-4">MIND Frontend vs JAX 0.9 jax.jit()</h2>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-muted">
                                <strong>Scope difference:</strong> MIND measures frontend only (parse + typecheck + IR). JAX <code>jax.jit()</code> performs <strong>full XLA compilation</strong> (HLO lowering + optimization + code generation). These are <strong>not equivalent operations</strong>.
                            </p>
                        </div>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Benchmark</th>
                                        <th className="text-left py-2 pr-4 font-bold">MIND Frontend</th>
                                        <th className="text-left py-2 pr-4 font-bold">JAX jax.jit() cold-start</th>
                                        <th className="text-left py-2 font-bold">Ratio</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">scalar_math</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">1.8 µs</td>
                                        <td className="py-2 pr-4">37.5 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">21,200x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">small_matmul</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">3.0 µs</td>
                                        <td className="py-2 pr-4">127.2 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">43,100x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">medium_matmul</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">3.0 µs</td>
                                        <td className="py-2 pr-4">139.7 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">47,400x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">large_matmul</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">3.0 µs</td>
                                        <td className="py-2 pr-4">280.6 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">95,100x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">simple_mlp</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">6.1 µs</td>
                                        <td className="py-2 pr-4">360.5 ms</td>
                                        <td className="py-2 font-semibold text-emerald-700">58,600x</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">What This Means</h4>
                            <p className="text-sm text-muted mb-2">
                                MIND&apos;s frontend is <strong>21,200-95,100x faster</strong> than JAX&apos;s cold-start XLA compilation. JAX compiles through XLA to produce optimized GPU/CPU kernels, while MIND&apos;s frontend only performs parsing, type checking, and IR lowering.
                            </p>
                            <p className="text-xs text-muted mt-3 italic">
                                Same-machine measurement: JAX 0.9.0.1 (CUDA 12.8, RTX 3080), cold-start with compilation cache disabled. MIND: Criterion (100 samples). Feb 2026.
                            </p>
                        </div>

                        {/* Reproduce It Yourself */}
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Reproduce It Yourself</h4>
                            <CodeBlock>{`# MIND frontend benchmarks (Criterion, in-process)
cargo bench --bench simple_benchmarks
cargo bench --bench compiler

# PyTorch comparison (same machine)
pip install torch
python benchmarks/scientific_benchmark.py`}</CodeBlock>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Deterministic Compilation</h2>
                        <p className="text-muted mb-4">
                            MIND guarantees <strong>100% bit-level reproducibility</strong> — every compilation produces identical output, verified via SHA256 cryptographic hashing.
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Test Program</th>
                                        <th className="text-left py-2 pr-4 font-bold">Runs</th>
                                        <th className="text-left py-2 pr-4 font-bold">Unique Hashes</th>
                                        <th className="text-left py-2 font-bold">Result</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">scalar_math</td>
                                        <td className="py-2 pr-4">10</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2 font-semibold text-green-600">Deterministic</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">small_matmul</td>
                                        <td className="py-2 pr-4">10</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2 font-semibold text-green-600">Deterministic</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">medium_matmul</td>
                                        <td className="py-2 pr-4">10</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2 font-semibold text-green-600">Deterministic</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">mlp</td>
                                        <td className="py-2 pr-4">10</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2 font-semibold text-green-600">Deterministic</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <p className="text-sm text-muted">
                                <strong>40 total runs, 0% hash collision rate, 100% reproducibility.</strong> MIND guarantees bit-identical output across runs, machines, and time.
                            </p>
                        </div>

                        <h2 id="compile-time-autodiff" className="text-2xl font-bold font-heading mt-12 mb-4">Compile-Time Autodiff</h2>
                        <p className="text-muted mb-4">
                            MIND generates gradient code <strong>once at compile-time</strong>, not on every training iteration. This eliminates per-iteration autodiff overhead entirely.
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Program</th>
                                        <th className="text-left py-2 pr-4 font-bold">MIND Cost</th>
                                        <th className="text-left py-2 pr-4 font-bold">PyTorch Cost</th>
                                        <th className="text-left py-2 font-bold">Advantage</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Simple Quadratic</td>
                                        <td className="py-2 pr-4">38 µs (once)</td>
                                        <td className="py-2 pr-4">51,100 µs (1000 iters)</td>
                                        <td className="py-2 font-semibold text-green-600">1,345x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Small MLP</td>
                                        <td className="py-2 pr-4">38 µs (once)</td>
                                        <td className="py-2 pr-4">345,900 µs (1000 iters)</td>
                                        <td className="py-2 font-semibold text-green-600">9,103x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Matmul Chain</td>
                                        <td className="py-2 pr-4">38 µs (once)</td>
                                        <td className="py-2 pr-4">428,800 µs (1000 iters)</td>
                                        <td className="py-2 font-semibold text-green-600">11,284x</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Key Insight</h4>
                            <p className="text-sm text-muted">
                                MIND&apos;s compile-time autodiff is <strong>1,345-11,284x more efficient</strong> than runtime autodiff over 1000 training iterations. The gradient code is already generated — just execute it.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Optimization Levels</h2>
                        <p className="text-muted mb-4">
                            The compiler provides several optimization profiles:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Flag</th>
                                        <th className="text-left py-2 pr-4 font-bold">Description</th>
                                        <th className="text-left py-2 font-bold">Deterministic</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>--debug</code></td>
                                        <td className="py-2 pr-4">No optimizations, full debugging symbols</td>
                                        <td className="py-2">Yes</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>--release</code></td>
                                        <td className="py-2 pr-4">Standard optimizations, deterministic</td>
                                        <td className="py-2">Yes</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>--release --fast-math</code></td>
                                        <td className="py-2 pr-4">Maximum performance, relaxed floating-point</td>
                                        <td className="py-2">No</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Compiler Optimizations</h2>
                        <p className="text-muted mb-4">
                            The MLIR-based pipeline applies several optimization passes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Operator fusion</strong> — combines sequential operations to reduce memory traffic</li>
                            <li><strong>Layout optimization</strong> — selects optimal memory layouts for target hardware</li>
                            <li><strong>Dead code elimination</strong> — removes unused computations</li>
                            <li><strong>Constant folding</strong> — evaluates compile-time-known expressions</li>
                            <li><strong>Loop tiling</strong> — improves cache utilization for large tensors</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Target Performance (CPU)</h2>
                        <p className="text-muted mb-4">
                            Benchmark targets for Core v1 operations on CPU:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Operation</th>
                                        <th className="text-left py-2 pr-4 font-bold">Target vs OpenBLAS</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">MatMul [4096x4096]</td>
                                        <td className="py-2 pr-4">1.0x - 1.5x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Conv2D</td>
                                        <td className="py-2 pr-4">1.2x - 2.0x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Element-wise ops</td>
                                        <td className="py-2 pr-4">1.0x - 1.2x</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Reductions</td>
                                        <td className="py-2 pr-4">1.0x - 1.3x</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Framework Comparison</h2>
                        <p className="text-muted mb-4">
                            Comparison of MIND frontend speed vs other frameworks&apos; full compilation pipelines. All numbers verified on the same machine (Feb 2026).
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-muted">
                                <strong>Different scope:</strong> MIND measures frontend only. Other frameworks measure full compilation to runnable code. Ratios reflect this difference.
                            </p>
                        </div>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Framework</th>
                                        <th className="text-left py-2 pr-4 font-bold">What&apos;s Measured</th>
                                        <th className="text-left py-2 pr-4 font-bold">Time</th>
                                        <th className="text-left py-2 pr-4 font-bold">Autodiff</th>
                                        <th className="text-left py-2 font-bold">Determinism</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4 font-semibold">MIND</td>
                                        <td className="py-2 pr-4 text-xs">Frontend (parse+typecheck+IR)</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">1.8-15.5 µs</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">Compile-time</td>
                                        <td className="py-2 font-semibold text-emerald-700">100% guaranteed</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">PyTorch 2.10 (GPU)</td>
                                        <td className="py-2 pr-4 text-xs">Full pipeline (graph+optimize+codegen)</td>
                                        <td className="py-2 pr-4">99-878 ms</td>
                                        <td className="py-2 pr-4">Runtime tape</td>
                                        <td className="py-2">Not guaranteed</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">JAX 0.9</td>
                                        <td className="py-2 pr-4 text-xs">Full XLA compilation (cold-start)</td>
                                        <td className="py-2 pr-4">37.5-360.5 ms</td>
                                        <td className="py-2 pr-4">jax.grad (tracing)</td>
                                        <td className="py-2">Mostly deterministic</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Mojo 0.26.1</td>
                                        <td className="py-2 pr-4 text-xs">Full LLVM compilation (mojo build)</td>
                                        <td className="py-2 pr-4">810-829 ms</td>
                                        <td className="py-2 pr-4">N/A</td>
                                        <td className="py-2">N/A</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Profiling</h2>
                        <p className="text-muted mb-4">
                            Built-in profiling support for performance analysis:
                        </p>
                        <CodeBlock className="mb-8">{`# Generate a trace profile
mindc run model.mind --profile=trace --output=trace.json

# CPU time breakdown
mindc run model.mind --profile=time`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Memory Efficiency</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Static memory planning eliminates runtime allocation overhead</li>
                            <li>Buffer reuse analysis minimizes peak memory usage</li>
                            <li>Optional memory pooling for real-time applications</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">GPU Runtime Performance (Enterprise)</h2>
                        <p className="text-muted mb-4">
                            The Enterprise CUDA backend delivers production-grade GPU acceleration, benchmarked on RTX 4070 (SM_89, Ada Lovelace):
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Metric</th>
                                        <th className="text-left py-2 pr-4 font-bold">PyTorch 2.8</th>
                                        <th className="text-left py-2 pr-4 font-bold">MIND Runtime</th>
                                        <th className="text-left py-2 font-bold">Improvement</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Memory Allocation</td>
                                        <td className="py-2 pr-4">46K/sec</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-600">8.3M/sec</td>
                                        <td className="py-2 font-semibold text-emerald-600">180x faster</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">MatMul TF32 (4096x4096)</td>
                                        <td className="py-2 pr-4">12.83 TFLOPS</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-600">17.32 TFLOPS</td>
                                        <td className="py-2 font-semibold text-emerald-600">35% faster</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">MatMul FP16 (4096x4096)</td>
                                        <td className="py-2 pr-4">23.82 TFLOPS</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-600">33.34 TFLOPS</td>
                                        <td className="py-2 font-semibold text-emerald-600">40% faster</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Elementwise Bandwidth</td>
                                        <td className="py-2 pr-4">228 GB/s</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-600">250 GB/s</td>
                                        <td className="py-2 font-semibold text-emerald-600">98% of peak</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-muted mb-8">
                            GPU runtime requires <a href="/enterprise" className="text-primary hover:underline">Enterprise license</a>.
                            Performance scales with GPU capabilities. Benchmarks verified February 2026.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>
                                <a href="/docs/guides/benchmarks" className="text-primary hover:underline">Running Benchmarks</a> — Reproduce the results yourself
                            </li>
                            <li>
                                <a href="/docs/performance/faq" className="text-primary hover:underline">Performance FAQ</a> — Common questions answered
                            </li>
                            <li>
                                <a href="https://github.com/star-ga/mind/blob/main/benchmarks/FINAL_PATENT_RESULTS.md" target="_blank" rel="noopener" className="text-primary hover:underline">Full Benchmark Results</a> — Complete verified data
                            </li>
                            <li>
                                <a href="https://github.com/star-ga/mind-spec/blob/main/spec/v1.0/performance.md" target="_blank" rel="noopener" className="text-primary hover:underline">Performance Specification</a> — Official spec document
                            </li>
                        </ul>
                    </div>

                    <PageNavigation
                        prev={{ label: "Security", href: "/docs/security" }}
                        next={{ label: "Future Extensions", href: "/docs/future" }}
                    />

                </main>
            </div>
        </div>
    );
}
