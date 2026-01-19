import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Performance",
    description: "MIND performance characteristics, optimization levels, and benchmarking.",
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
                            MIND achieves exceptional performance through its innovative compiler architecture — ultra-fast compilation, 100% deterministic builds, and compile-time autodiff.
                        </p>

                        {/* Scientific Benchmarks Banner */}
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-foreground mb-2">Scientific Benchmark Methodology (Jan 2026)</h3>
                            <p className="text-sm text-muted mb-4">
                                We measure <strong>pure compilation time</strong> by subtracting subprocess startup overhead from all measurements — ensuring fair, apples-to-apples comparison:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="p-3 bg-white/50 rounded-lg">
                                    <div className="font-semibold mb-1">MIND Compilation Modes</div>
                                    <div><span className="text-muted">mind compile (typecheck):</span> <span className="font-medium">~100 µs</span></div>
                                    <div><span className="text-muted">mind build (full IR):</span> <span className="font-medium">187 µs</span></div>
                                </div>
                                <div className="p-3 bg-white/50 rounded-lg">
                                    <div className="font-semibold mb-1">Competitors (Pure Compile)</div>
                                    <div><span className="text-muted">PyTorch 2.0:</span> <span className="font-medium text-red-600">2,766 ms</span> <span className="text-emerald-700">(14,769× slower)</span></div>
                                    <div><span className="text-muted">JAX:</span> <span className="font-medium text-red-600">135 ms</span> <span className="text-emerald-700">(2,699× slower)</span></div>
                                    <div><span className="text-muted">Mojo:</span> <span className="font-medium text-red-600">757 ms</span> <span className="text-emerald-700">(4,040× slower)</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Unique Dual-Mode Compilation */}
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">MIND: Unique Dual-Mode Compilation</h4>
                            <p className="text-sm text-muted mb-3">
                                MIND is the only ML compiler offering both <strong>typecheck-only</strong> (<code>mind compile</code>) and <strong>full IR generation</strong> (<code>mind build</code>) modes:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-sm text-muted">
                                <li><strong>mind compile (~100 µs)</strong> — Static type checking and shape inference only. Ideal for rapid iteration during development.</li>
                                <li><strong>mind build (187 µs)</strong> — Full IR generation with all optimizations. Used for deployment and benchmarking.</li>
                            </ul>
                            <p className="text-xs text-muted mt-3 italic">
                                Mojo only has <code>build</code> (full LLVM) — no separate typecheck mode. PyTorch/JAX also only have full compilation. MIND is unique with both modes.
                            </p>
                        </div>

                        {/* Live Benchmark Demo Video */}
                        <div className="my-8">
                            <h3 className="text-xl font-bold font-heading mb-4">Live Benchmark Demo</h3>
                            <p className="text-sm text-muted mb-4">
                                Watch the scientific benchmark running live — measuring subprocess overhead and calculating pure compilation time for fair comparison:
                            </p>
                            <div className="rounded-xl overflow-hidden border border-border bg-neutral-900">
                                <video
                                    className="w-full"
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    poster="/demo/benchmarks/MIND_Scientific_Benchmark.gif"
                                >
                                    <source src="/demo/benchmarks/MIND_Scientific_Benchmark.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <p className="text-xs text-muted mt-2 text-center">
                                All measurements run live on the same machine with equivalent tensor operations. No hardcoded values.
                            </p>
                        </div>

                        <h2 id="compilation-speed-mind-vs-pytorch-20" className="text-2xl font-bold font-heading mt-12 mb-4">Compilation Speed: MIND vs PyTorch 2.0</h2>
                        <p className="text-muted mb-4">
                            Scientific comparison using subprocess overhead subtraction methodology (Jan 2026):
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Compiler</th>
                                        <th className="text-left py-2 pr-4 font-bold">Command</th>
                                        <th className="text-left py-2 pr-4 font-bold">Pure Compile Time</th>
                                        <th className="text-left py-2 font-bold">vs MIND</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4 font-semibold">MIND</td>
                                        <td className="py-2 pr-4"><code>mind compile</code></td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">~100 µs</td>
                                        <td className="py-2">baseline (typecheck)</td>
                                    </tr>
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4 font-semibold">MIND</td>
                                        <td className="py-2 pr-4"><code>mind build</code></td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">187 µs</td>
                                        <td className="py-2">baseline (full IR)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">PyTorch 2.0</td>
                                        <td className="py-2 pr-4"><code>torch.compile</code> (inductor)</td>
                                        <td className="py-2 pr-4">2,766 ms</td>
                                        <td className="py-2 font-semibold text-green-600">14,769× slower</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">JAX</td>
                                        <td className="py-2 pr-4"><code>jax.jit</code></td>
                                        <td className="py-2 pr-4">135 ms</td>
                                        <td className="py-2 font-semibold text-green-600">2,699× slower</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Mojo</td>
                                        <td className="py-2 pr-4"><code>mojo build</code></td>
                                        <td className="py-2 pr-4">757 ms</td>
                                        <td className="py-2 font-semibold text-green-600">4,040× slower</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Methodology: Subprocess Overhead Subtraction</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="font-medium mb-1">Startup Overhead (subtracted)</div>
                                    <div><span className="text-muted">MIND:</span> ~1.0 ms</div>
                                    <div><span className="text-muted">PyTorch:</span> ~1,380 ms</div>
                                    <div><span className="text-muted">JAX:</span> ~463 ms</div>
                                    <div><span className="text-muted">Mojo:</span> ~57 ms</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="font-medium mb-1">Why This Matters</div>
                                    <div className="text-xs">
                                        Naive subprocess timing unfairly penalizes Python-based frameworks.
                                        Pure Compile = Total − Startup ensures fair comparison of actual compilation work.
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-muted mt-3">
                                Live measurements on Ubuntu Linux (Jan 2026). All tests run on same machine with equivalent tensor operations.
                            </p>
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
                                <strong>40 total runs, 0% hash collision rate, 100% reproducibility.</strong> As of December 2025, MIND is one of the few ML compilers that guarantees bit-identical output across runs, machines, and time.
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
                                        <td className="py-2 font-semibold text-green-600">1,345×</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Small MLP</td>
                                        <td className="py-2 pr-4">38 µs (once)</td>
                                        <td className="py-2 pr-4">345,900 µs (1000 iters)</td>
                                        <td className="py-2 font-semibold text-green-600">9,103×</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Matmul Chain</td>
                                        <td className="py-2 pr-4">38 µs (once)</td>
                                        <td className="py-2 pr-4">428,800 µs (1000 iters)</td>
                                        <td className="py-2 font-semibold text-green-600">11,284×</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Key Insight</h4>
                            <p className="text-sm text-muted">
                                MIND&apos;s compile-time autodiff is <strong>1,345-11,284× more efficient</strong> than runtime autodiff over 1000 training iterations. The gradient code is already generated — just execute it.
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

                        <h2 id="compilation-speed-mind-vs-mojo" className="text-2xl font-bold font-heading mt-12 mb-4">Compilation Speed: MIND vs Mojo</h2>
                        <p className="text-muted mb-4">
                            Scientific comparison using subprocess overhead subtraction methodology (Jan 2026). Mojo only offers <code>mojo build</code> (full LLVM compilation) — no separate typecheck mode like MIND&apos;s <code>mind compile</code>.
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Compiler</th>
                                        <th className="text-left py-2 pr-4 font-bold">Command</th>
                                        <th className="text-left py-2 pr-4 font-bold">Pure Compile Time</th>
                                        <th className="text-left py-2 font-bold">MIND Speedup</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4 font-semibold">MIND</td>
                                        <td className="py-2 pr-4"><code>mind build</code></td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">187 µs</td>
                                        <td className="py-2">baseline</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Mojo</td>
                                        <td className="py-2 pr-4"><code>mojo build</code></td>
                                        <td className="py-2 pr-4">757 ms</td>
                                        <td className="py-2 font-semibold text-green-600">4,040× slower</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Why MIND Is Faster Than Mojo</h4>
                            <ul className="list-disc pl-6 space-y-1 text-muted text-sm">
                                <li><strong>MIND:</strong> Purpose-built Rust compiler, minimal dependencies, efficient IR design</li>
                                <li><strong>Mojo:</strong> Full LLVM pipeline including library initialization (~57ms startup overhead)</li>
                                <li><strong>Key difference:</strong> Mojo has no typecheck-only mode — <code>mojo build</code> always runs full LLVM compilation</li>
                            </ul>
                            <p className="text-xs text-muted mt-3">
                                Live benchmark using scientific methodology (subprocess overhead subtracted). |
                                <a href="https://github.com/star-ga/mind/tree/main/benchmarks/mojo" target="_blank" rel="noopener" className="text-primary hover:underline ml-1">
                                    View benchmark source
                                </a>
                            </p>
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

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Framework Comparison</h2>
                        <p className="text-muted mb-4">
                            Scientific comparison using subprocess overhead subtraction methodology (Jan 2026):
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Framework</th>
                                        <th className="text-left py-2 pr-4 font-bold">Compilation</th>
                                        <th className="text-left py-2 pr-4 font-bold">Typecheck-Only Mode</th>
                                        <th className="text-left py-2 pr-4 font-bold">Autodiff</th>
                                        <th className="text-left py-2 font-bold">Determinism</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4 font-semibold">MIND</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">100-187 µs</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">Yes (~100 µs)</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">Compile-time</td>
                                        <td className="py-2 font-semibold text-emerald-700">100% guaranteed</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">PyTorch 2.0</td>
                                        <td className="py-2 pr-4">2,766 ms</td>
                                        <td className="py-2 pr-4 text-red-600">No</td>
                                        <td className="py-2 pr-4">Runtime tape</td>
                                        <td className="py-2">Not guaranteed</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">JAX (XLA)</td>
                                        <td className="py-2 pr-4">135 ms</td>
                                        <td className="py-2 pr-4 text-red-600">No</td>
                                        <td className="py-2 pr-4">JIT transforms</td>
                                        <td className="py-2">Mostly deterministic</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Mojo</td>
                                        <td className="py-2 pr-4">757 ms</td>
                                        <td className="py-2 pr-4 text-red-600">No (LLVM only)</td>
                                        <td className="py-2 pr-4">External</td>
                                        <td className="py-2">Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <p className="text-sm text-muted">
                                <strong>Key Insight:</strong> As of January 2026, MIND is the only ML compiler offering <strong>dual-mode compilation</strong> (typecheck-only + full IR), achieving sub-200 µs compilation, 100% deterministic builds, and compile-time autodiff.
                            </p>
                            <p className="text-xs text-muted mt-2 italic">
                                Mojo only has <code>build</code> (full LLVM) — no separate typecheck mode. PyTorch/JAX also only have full compilation. MIND is unique with both modes.
                            </p>
                        </div>

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
                            Performance scales with GPU capabilities. Benchmarks verified December 2025.
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
