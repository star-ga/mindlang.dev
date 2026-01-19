import { Metadata } from "next";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Performance FAQ",
    description: "Common questions about MIND's performance characteristics.",
};

export default function PerformanceFAQPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/performance/faq" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/performance/faq" />
                    <h1 className="page-title mt-4">Performance FAQ</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Common questions about MIND&apos;s performance characteristics.
                        </p>

                        {/* Compilation Speed Section */}
                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Compilation Speed</h2>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">How fast is MIND compilation?</h3>
                            <p className="text-muted">
                                <strong>25-53 microseconds</strong> for typical programs (measured in-process via Rust Criterion benchmarks).
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">How does this compare to other frameworks?</h3>
                            <div className="overflow-x-auto mt-4">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2 pr-4 font-bold">Framework</th>
                                            <th className="text-left py-2 font-bold">Compilation Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-muted">
                                        <tr className="border-b bg-emerald-50/50">
                                            <td className="py-2 pr-4 font-semibold">MIND (Windows 11, Dec 2025)</td>
                                            <td className="py-2 font-semibold text-emerald-700">~38 µs</td>
                                        </tr>
                                        <tr className="border-b bg-emerald-50/50">
                                            <td className="py-2 pr-4 font-semibold">MIND (Ubuntu Linux, Jan 2026)</td>
                                            <td className="py-2 font-semibold text-emerald-700">~25-53 µs</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 pr-4">PyTorch 2.0 (inductor)</td>
                                            <td className="py-2">43-79 ms (800-3,200× slower)</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 pr-4">JAX (XLA)</td>
                                            <td className="py-2">10-50 ms (263-1,316× slower)</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 pr-4">TVM</td>
                                            <td className="py-2">10-100 ms (263-2,632× slower)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-muted mt-4">
                                MIND is <strong>800-3,200× faster than PyTorch 2.0 (inductor)</strong> — fair in-process comparison.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">Why is MIND so fast?</h3>
                            <ol className="list-decimal pl-6 space-y-2 text-muted mt-4">
                                <li><strong>Specialized design:</strong> Built specifically for tensor operations, not general-purpose</li>
                                <li><strong>Single-pass compilation:</strong> No multi-stage optimization passes</li>
                                <li><strong>Efficient type checking:</strong> O(n log n) type inference</li>
                                <li><strong>Fast parser:</strong> O(n) recursive descent parsing</li>
                                <li><strong>No runtime tracing:</strong> Pure static compilation</li>
                            </ol>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-bold mb-2">Does fast compilation hurt runtime performance?</h3>
                            <p className="text-muted">
                                <strong>No.</strong> MIND optimizes <strong>both</strong> compilation and runtime:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted mt-4">
                                <li>Fast compilation (25-53 µs) enables rapid iteration</li>
                                <li>Efficient runtime ensures production performance</li>
                            </ul>
                            <p className="text-sm text-muted mt-4">
                                Many frameworks optimize one at the expense of the other (e.g., XLA optimizes runtime but takes 10-100ms to compile).
                            </p>
                        </div>

                        {/* Determinism Section */}
                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Determinism</h2>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">What does &quot;100% deterministic&quot; mean?</h3>
                            <p className="text-muted">
                                Every compilation of the same source code produces <strong>bit-identical output</strong>:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted mt-4">
                                <li>Same SHA256 hash</li>
                                <li>Byte-for-byte identical</li>
                                <li>Across different runs, machines, and times</li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">How is this verified?</h3>
                            <p className="text-muted">
                                We use <strong>SHA256 cryptographic hashing</strong> of the complete compilation output:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted mt-4">
                                <li>40 total test runs (4 programs × 10 runs each)</li>
                                <li>0% hash collision rate</li>
                                <li>100% reproducibility verified</li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">Why does determinism matter?</h3>
                            <ol className="list-decimal pl-6 space-y-2 text-muted mt-4">
                                <li><strong>Reproducible research:</strong> Your results are exactly reproducible</li>
                                <li><strong>Debugging:</strong> Eliminate non-determinism as a variable</li>
                                <li><strong>Auditing:</strong> Verify production builds are identical to tested builds</li>
                                <li><strong>Caching:</strong> Can safely cache compilation results</li>
                            </ol>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-bold mb-2">Do other frameworks have this?</h3>
                            <p className="text-muted">
                                Most frameworks do <strong>not</strong> guarantee determinism:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted mt-4">
                                <li><strong>PyTorch:</strong> Non-deterministic (hash maps, random initialization)</li>
                                <li><strong>JAX:</strong> &quot;Mostly&quot; deterministic (not guaranteed)</li>
                                <li><strong>XLA:</strong> Non-deterministic (optimization passes)</li>
                            </ul>
                            <p className="text-sm text-muted mt-4 font-semibold">
                                Unlike most frameworks, MIND is <strong>designed to be 100% deterministic</strong>.
                            </p>
                        </div>

                        {/* Autodiff Section */}
                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Autodiff</h2>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">What is &quot;compile-time autodiff&quot;?</h3>
                            <p className="text-muted">
                                MIND generates gradient computation code <strong>during compilation</strong>, not at runtime.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 text-muted">Traditional (runtime) autodiff</h4>
                                    <ol className="text-sm text-muted space-y-1 list-decimal pl-4">
                                        <li>Run forward pass → Build tape</li>
                                        <li>Run backward pass → Walk tape</li>
                                        <li>Repeat every training iteration</li>
                                    </ol>
                                </div>
                                <div className="bg-emerald-50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 text-emerald-700">MIND (compile-time) autodiff</h4>
                                    <ol className="text-sm text-muted space-y-1 list-decimal pl-4">
                                        <li>Compile → Generate gradient IR</li>
                                        <li>Training: Execute pre-generated code</li>
                                        <li>No tape, no per-iteration cost</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">How much faster is it?</h3>
                            <p className="text-muted">
                                Over 1000 training iterations:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted mt-4">
                                <li><strong>MIND:</strong> 25-53 µs (paid once)</li>
                                <li><strong>PyTorch:</strong> ~50-500 ms (paid every iteration)</li>
                                <li><strong>Advantage:</strong> 1,345-11,284× more efficient (depending on model complexity)</li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-bold mb-2">Is there any runtime cost?</h3>
                            <p className="text-muted">
                                <strong>Zero</strong> per-iteration autodiff cost. The gradient code is already compiled — just execute it.
                            </p>
                        </div>

                        {/* Benchmarks Section */}
                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Benchmarks</h2>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">Where can I see the full results?</h3>
                            <p className="text-muted">
                                <a href="https://github.com/cputer/mind/blob/main/benchmarks/FINAL_PATENT_RESULTS.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                    Full benchmark results on GitHub
                                </a>
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">Can I reproduce the benchmarks?</h3>
                            <p className="text-muted">
                                Yes! See <a href="/docs/guides/benchmarks" className="text-primary hover:underline">Running Benchmarks</a> for step-by-step instructions.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">What hardware were benchmarks run on?</h3>
                            <ul className="list-disc pl-6 space-y-2 text-muted mt-4">
                                <li><strong>Platform:</strong> Linux 4.4.0 x86_64</li>
                                <li><strong>Python:</strong> 3.11.14</li>
                                <li><strong>PyTorch:</strong> 2.9.1+cpu</li>
                                <li><strong>Date:</strong> December 2025</li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-bold mb-2">Why use Python bindings for measurement?</h3>
                            <p className="text-muted">
                                Python <code>subprocess.run()</code> adds ~5ms overhead (process spawning + IPC). Python bindings (PyO3) eliminate this overhead to reveal <strong>true compilation time</strong>.
                            </p>
                            <div className="bg-slate-50 rounded-lg p-3 mt-4 text-sm text-muted">
                                <p><strong>With subprocess:</strong> ~5.5 ms (includes ~5ms overhead)</p>
                                <p><strong>With bindings:</strong> 25-53 µs (true compilation time)</p>
                            </div>
                        </div>

                        {/* Future Performance Section */}
                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Future Performance</h2>

                        <div className="bg-card border border-border rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-bold mb-2">Will compilation get even faster?</h3>
                            <p className="text-muted">
                                Yes! Planned improvements:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted mt-4">
                                <li><strong>Short-term (6 months):</strong> Target &lt;20 µs (2× faster)</li>
                                <li><strong>Long-term (1-2 years):</strong> Target &lt;10 µs (4× faster)</li>
                            </ul>
                            <p className="text-sm text-muted mt-4">
                                Methods: Parser optimizations, incremental compilation, caching
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-bold mb-2">What about GPU support?</h3>
                            <p className="text-muted">
                                GPU support (CUDA, Metal) is on the roadmap. Compilation will remain fast (25-53 µs), with GPU-optimized runtime kernels.
                            </p>
                            <p className="text-sm text-muted mt-4">
                                See <a href="/roadmap" className="text-primary hover:underline">Roadmap</a> for details.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>
                                <a href="/docs/performance" className="text-primary hover:underline">Performance Overview</a> — Complete performance documentation
                            </li>
                            <li>
                                <a href="/docs/guides/benchmarks" className="text-primary hover:underline">Running Benchmarks</a> — Reproduce the results yourself
                            </li>
                            <li>
                                <a href="https://github.com/cputer/mind/blob/main/benchmarks/FINAL_PATENT_RESULTS.md" target="_blank" rel="noopener" className="text-primary hover:underline">Full Benchmark Results</a> — Complete verified data
                            </li>
                        </ul>
                    </div>

                    <PageNavigation
                        prev={{ label: "Performance Overview", href: "/docs/performance" }}
                        next={{ label: "Future Extensions", href: "/docs/future" }}
                    />
                </main>
            </div>
        </div>
    );
}
