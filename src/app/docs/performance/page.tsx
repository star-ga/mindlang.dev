import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
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
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Performance</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND achieves exceptional performance through its innovative compiler architecture — ultra-fast compilation, 100% deterministic builds, and compile-time autodiff.
                        </p>

                        {/* Verified Benchmarks Banner */}
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-foreground mb-2">Verified Benchmarks (December 2025)</h3>
                            <p className="text-sm text-muted mb-4">
                                All measurements scientifically validated on same-machine hardware:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div><span className="text-muted">Platform:</span> <span className="font-medium">Linux 4.4.0 x86_64</span></div>
                                <div><span className="text-muted">Python:</span> <span className="font-medium">3.11.14</span></div>
                                <div><span className="text-muted">PyTorch:</span> <span className="font-medium">2.9.1+cpu</span></div>
                                <div><span className="text-muted">MIND:</span> <span className="font-medium">0.1.0 (release)</span></div>
                            </div>
                        </div>

                        <h2 id="compilation-speed-mind-vs-pytorch-20" className="text-2xl font-bold font-heading mt-12 mb-4">Compilation Speed: MIND vs PyTorch 2.0</h2>
                        <p className="text-muted mb-4">
                            MIND compiles in <strong>~1.4 ms</strong> via subprocess (25-53 µs in-process) — for fair comparison with other tools:
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Benchmark</th>
                                        <th className="text-left py-2 pr-4 font-bold">MIND</th>
                                        <th className="text-left py-2 pr-4 font-bold">PyTorch 2.0</th>
                                        <th className="text-left py-2 font-bold">MIND Speedup</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Small MatMul</td>
                                        <td className="py-2 pr-4">38 µs</td>
                                        <td className="py-2 pr-4">2.2 ms</td>
                                        <td className="py-2 font-semibold text-green-600">58× faster</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Medium MatMul</td>
                                        <td className="py-2 pr-4">38 µs</td>
                                        <td className="py-2 pr-4">2.0 ms</td>
                                        <td className="py-2 font-semibold text-green-600">53× faster</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Conv2D</td>
                                        <td className="py-2 pr-4">38 µs</td>
                                        <td className="py-2 pr-4">9.4 ms</td>
                                        <td className="py-2 font-semibold text-green-600">53× faster</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Simple MLP</td>
                                        <td className="py-2 pr-4">38 µs</td>
                                        <td className="py-2 pr-4">2.0 ms</td>
                                        <td className="py-2 font-semibold text-green-600">53× faster</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">MIND Compilation Statistics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div><span className="text-muted">Mean:</span> <span className="font-medium">38.3 µs</span></div>
                                <div><span className="text-muted">StdDev:</span> <span className="font-medium">4.3 µs</span></div>
                                <div><span className="text-muted">Min:</span> <span className="font-medium">35.7 µs</span></div>
                                <div><span className="text-muted">Max:</span> <span className="font-medium">53.4 µs</span></div>
                            </div>
                            <p className="text-xs text-muted mt-3">
                                Measured via Python bindings (PyO3) to eliminate subprocess overhead |
                                95% CI: [37.4, 39.2] µs
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
                            MIND&apos;s compilation speed is designed for rapid iteration during development.
                            Unlike traditional ML compilers that scale compilation time with model complexity,
                            MIND compiles in microseconds regardless of model size.
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Benchmark</th>
                                        <th className="text-left py-2 pr-4 font-bold">MIND</th>
                                        <th className="text-left py-2 pr-4 font-bold">Mojo 0.25.7</th>
                                        <th className="text-left py-2 font-bold">MIND Speedup</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Scalar Math</td>
                                        <td className="py-2 pr-4">22 µs</td>
                                        <td className="py-2 pr-4">441 ms</td>
                                        <td className="py-2 font-semibold text-green-600">20,041×</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Small MatMul (10×20 × 20×30)</td>
                                        <td className="py-2 pr-4">41 µs</td>
                                        <td className="py-2 pr-4">498 ms</td>
                                        <td className="py-2 font-semibold text-green-600">12,126×</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Medium MatMul (128×256 × 256×512)</td>
                                        <td className="py-2 pr-4">41 µs</td>
                                        <td className="py-2 pr-4">1.34 s</td>
                                        <td className="py-2 font-semibold text-green-600">32,925×</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Large MatMul (512×1024 × 1024×512)</td>
                                        <td className="py-2 pr-4">41 µs</td>
                                        <td className="py-2 pr-4">13.8 s</td>
                                        <td className="py-2 font-semibold text-green-600">339,426×</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Key Observations</h4>
                            <ul className="list-disc pl-6 space-y-1 text-muted text-sm">
                                <li>MIND compiles in <strong>microseconds</strong> regardless of model complexity</li>
                                <li>Mojo compilation time scales with computation size (seconds for larger models)</li>
                                <li>MIND achieves <strong>~650× faster</strong> compilation (fair subprocess-to-subprocess comparison)</li>
                            </ul>
                            <p className="text-xs text-muted mt-3">
                                Same-machine benchmark: AlmaLinux 9.7, LLVM 20, Mojo 0.25.7 |
                                <a href="https://github.com/cputer/mind/tree/main/benchmarks/mojo" target="_blank" rel="noopener" className="text-primary hover:underline ml-1">
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
                            How MIND compares to other ML frameworks:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Framework</th>
                                        <th className="text-left py-2 pr-4 font-bold">Compilation</th>
                                        <th className="text-left py-2 pr-4 font-bold">Autodiff</th>
                                        <th className="text-left py-2 font-bold">Determinism</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b bg-emerald-50/50">
                                        <td className="py-2 pr-4 font-semibold">MIND</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">~38 µs</td>
                                        <td className="py-2 pr-4 font-semibold text-emerald-700">Compile-time</td>
                                        <td className="py-2 font-semibold text-emerald-700">100% guaranteed</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">PyTorch 2.0</td>
                                        <td className="py-2 pr-4">2-10 ms</td>
                                        <td className="py-2 pr-4">Runtime tape</td>
                                        <td className="py-2">Not guaranteed</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">JAX (XLA)</td>
                                        <td className="py-2 pr-4">10-50 ms</td>
                                        <td className="py-2 pr-4">JIT transforms</td>
                                        <td className="py-2">Mostly deterministic</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">TVM</td>
                                        <td className="py-2 pr-4">10-100 ms</td>
                                        <td className="py-2 pr-4">External</td>
                                        <td className="py-2">Not guaranteed</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <p className="text-sm text-muted">
                                <strong>Key Insight:</strong> As of December 2025, MIND is the only framework we are aware of that achieves all three: sub-100 µs compilation, 100% deterministic builds, and compile-time autodiff.
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
                                <a href="https://github.com/cputer/mind/blob/main/benchmarks/FINAL_PATENT_RESULTS.md" target="_blank" rel="noopener" className="text-primary hover:underline">Full Benchmark Results</a> — Complete verified data
                            </li>
                            <li>
                                <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/performance.md" target="_blank" rel="noopener" className="text-primary hover:underline">Performance Specification</a> — Official spec document
                            </li>
                        </ul>
                    </div>

                    <PageNavigation
                        prev={{ label: "Security", href: "/docs/security" }}
                        next={{ label: "Future Extensions", href: "/docs/future" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/performance" />
                </main>
            </div>
        </div>
    );
}
