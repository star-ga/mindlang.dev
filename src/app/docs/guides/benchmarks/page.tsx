import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Running Benchmarks",
    description: "How to reproduce MIND's performance benchmarks and verify the results yourself.",
};

export default function BenchmarksGuidePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/guides/benchmarks" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/guides/benchmarks" />
                    <h1 className="page-title mt-4">Running Benchmarks</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Learn how to run MIND&apos;s performance benchmarks and verify the results yourself.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Prerequisites</h2>
                        <CodeBlock className="mb-8">{`# Clone the MIND repository
git clone https://github.com/cputer/mind.git
cd mind

# Build MIND in release mode
cargo build --release`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Determinism Benchmark</h2>
                        <p className="text-muted mb-4">
                            Verify that MIND produces bit-identical compilation output.
                        </p>
                        <CodeBlock className="mb-4">{`python3 benchmarks/determinism/benchmark_determinism.py`}</CodeBlock>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Expected Output</h4>
                            <pre className="text-sm text-muted bg-slate-50 p-3 rounded overflow-x-auto">
{`SUMMARY: 4/4 tests DETERMINISTIC
✅ DETERMINISM VERIFIED: All outputs are bit-identical across runs`}
                            </pre>
                            <p className="text-sm text-muted mt-3">
                                <strong>What it tests:</strong> 4 different programs (scalar_math, small_matmul, medium_matmul, mlp), 10 compilation runs per program, SHA256 hash comparison. 100% identical hashes = deterministic.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">PyTorch Comparison Benchmark</h2>
                        <p className="text-muted mb-4">
                            Compare MIND compilation speed vs PyTorch 2.0.
                        </p>
                        <CodeBlock className="mb-4">{`# Install PyTorch if needed
pip install torch

# Run comparison
python3 benchmarks/pytorch_comparison/benchmark_pytorch_compile.py`}</CodeBlock>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Expected Output</h4>
                            <pre className="text-sm text-muted bg-slate-50 p-3 rounded overflow-x-auto">
{`Benchmark         MIND      PyTorch 2.0    MIND Speedup
--------------------------------------------------------
scalar_math       5.5 ms    2.4 ms         (see note below)
conv2d            5.4 ms    9.4 ms         2× faster`}
                            </pre>
                            <p className="text-sm text-muted mt-3">
                                <strong>Note:</strong> MIND times include ~5ms subprocess overhead. See next section for real compilation time.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Real Compilation Time (Python Bindings)</h2>
                        <p className="text-muted mb-4">
                            Measure MIND&apos;s true compilation time without subprocess overhead.
                        </p>
                        <CodeBlock className="mb-4">{`# Build Python bindings
maturin build --release --features python-bindings,autodiff

# Install the wheel
pip install target/wheels/mind-*.whl

# Run test
python3 test_real_compile_time.py`}</CodeBlock>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Expected Output</h4>
                            <pre className="text-sm text-muted bg-slate-50 p-3 rounded overflow-x-auto">
{`Real MIND Compilation Time (NO subprocess overhead):
  Mean:   38.3 µs
  StdDev: 4.3 µs
  Min:    35.7 µs
  Max:    53.4 µs`}
                            </pre>
                            <p className="text-sm text-muted mt-3">
                                <strong>This is the TRUE compilation time</strong> — no process spawning, no IPC overhead.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">GPU Benchmarks (Enterprise)</h2>
                        <p className="text-muted mb-4">
                            The Enterprise runtime includes CUDA GPU benchmarks. Contact sales for access to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Memory allocation</strong>: CachingAllocator vs cudaMalloc (180x improvement)</li>
                            <li><strong>MatMul performance</strong>: cuBLAS with TF32/FP16 Tensor Cores (35-40% faster than PyTorch)</li>
                            <li><strong>Elementwise operations</strong>: float4 vectorized kernels (98% bandwidth utilization)</li>
                            <li><strong>Supported GPUs</strong>: NVIDIA SM_80+ (Ampere, Ada Lovelace, Hopper)</li>
                        </ul>
                        <p className="text-sm text-muted mb-8">
                            See <a href="/enterprise" className="text-primary hover:underline">Enterprise</a> for licensing details.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Understanding the Results</h2>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-4">Why Python Bindings?</h3>
                        <p className="text-muted mb-4">
                            The Python bindings (PyO3) allow calling the Rust compiler <strong>directly</strong> from Python, eliminating:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Process spawning overhead (~2-3 ms)</li>
                            <li>Inter-process communication (~1-2 ms)</li>
                            <li><strong>Total overhead: ~5 ms</strong></li>
                        </ul>
                        <p className="text-muted mb-4">
                            This reveals MIND&apos;s <strong>true compilation performance: 25-53 µs</strong> (varies by machine)
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-4">Subprocess vs Direct Call</h3>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-2 text-muted">subprocess.run(&quot;mind compile&quot;)</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        <li>Spawn process: ~2-3 ms</li>
                                        <li>IPC overhead: ~1-2 ms</li>
                                        <li>Actual compile: 25-53 µs</li>
                                        <li className="font-semibold border-t pt-1 mt-2">TOTAL: ~5 ms</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-emerald-700">mind.compile() (Python binding)</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        <li>Direct function call: ~0 µs</li>
                                        <li>Actual compile: 25-53 µs</li>
                                        <li className="font-semibold border-t pt-1 mt-2 text-emerald-700">TOTAL: 25-53 µs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Benchmark Methodology</h2>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-4">Same-Machine Testing</h3>
                        <p className="text-muted mb-4">
                            All comparisons performed on <strong>identical hardware</strong>:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Same CPU, RAM, OS</li>
                            <li>Same Python version</li>
                            <li>Sequential testing (no parallel interference)</li>
                            <li>Controlled environment</li>
                        </ul>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-4">Statistical Rigor</h3>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Warmup:</strong> 10 runs (eliminate cold-start)</li>
                            <li><strong>Sample size:</strong> 100 measurements</li>
                            <li><strong>Outlier detection:</strong> Tukey&apos;s method</li>
                            <li><strong>Confidence intervals:</strong> 95% CI</li>
                            <li><strong>Precision:</strong> Nanosecond resolution (perf_counter)</li>
                        </ul>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-4">Determinism Verification</h3>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>SHA256 hashing:</strong> Cryptographic-strength verification</li>
                            <li><strong>Byte-level comparison:</strong> Exact binary match</li>
                            <li><strong>Multiple runs:</strong> 10+ per test</li>
                            <li><strong>Zero tolerance:</strong> Any mismatch = failure</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Reproducing Published Results</h2>
                        <p className="text-muted mb-4">
                            The published benchmark results are from:
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full text-sm">
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">Date</td>
                                        <td className="py-2">December 2025</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">Platform</td>
                                        <td className="py-2">Linux 4.4.0 x86_64</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">Python</td>
                                        <td className="py-2">3.11.14</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">PyTorch</td>
                                        <td className="py-2">2.9.1+cpu</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-muted mb-4">
                            To reproduce exactly:
                        </p>
                        <CodeBlock className="mb-8">{`cargo build --release
# Run benchmarks as shown above`}</CodeBlock>
                        <p className="text-muted mb-8">
                            Results should be within ±10% due to hardware differences.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">MIC/MAP Format Benchmark</h2>
                        <p className="text-muted mb-4">
                            Compare MIC format efficiency against JSON, TOML, and TOON.
                        </p>
                        <CodeBlock className="mb-4">{`cd benchmarks
python3 format_benchmark.py`}</CodeBlock>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Token Efficiency Results</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2 pr-4">Format</th>
                                            <th className="text-left py-2 pr-4">Tokens</th>
                                            <th className="text-left py-2 pr-4">vs JSON</th>
                                            <th className="text-left py-2 pr-4">Parse Speed</th>
                                            <th className="text-left py-2">Annual Cost (1M IRs)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-muted">
                                        <tr className="border-b">
                                            <td className="py-2 pr-4">JSON</td>
                                            <td className="py-2 pr-4">278</td>
                                            <td className="py-2 pr-4">baseline</td>
                                            <td className="py-2 pr-4">5.31 us</td>
                                            <td className="py-2">$487</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 pr-4">TOML</td>
                                            <td className="py-2 pr-4">151</td>
                                            <td className="py-2 pr-4">1.8x</td>
                                            <td className="py-2 pr-4">137.06 us</td>
                                            <td className="py-2">$264</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2 pr-4">TOON</td>
                                            <td className="py-2 pr-4">67</td>
                                            <td className="py-2 pr-4">4.1x</td>
                                            <td className="py-2 pr-4">2.67 us</td>
                                            <td className="py-2">$117</td>
                                        </tr>
                                        <tr className="border-b bg-primary/5">
                                            <td className="py-2 pr-4 font-bold">MIC</td>
                                            <td className="py-2 pr-4 font-bold">52</td>
                                            <td className="py-2 pr-4 font-bold">5.3x</td>
                                            <td className="py-2 pr-4 font-bold">2.26 us</td>
                                            <td className="py-2 font-bold">$91</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-muted mt-3">
                                <strong>MIC saves $396/year</strong> per million IR operations vs JSON at GPT-5.2 pricing ($0.00175/1K input tokens).
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">MAP vs JSON-RPC</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2 pr-4">Protocol</th>
                                            <th className="text-left py-2 pr-4">Size</th>
                                            <th className="text-left py-2 pr-4">Tokens</th>
                                            <th className="text-left py-2">vs JSON-RPC</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-muted">
                                        <tr className="border-b">
                                            <td className="py-2 pr-4">JSON-RPC</td>
                                            <td className="py-2 pr-4">1,004 bytes</td>
                                            <td className="py-2 pr-4">251</td>
                                            <td className="py-2">baseline</td>
                                        </tr>
                                        <tr className="border-b bg-primary/5">
                                            <td className="py-2 pr-4 font-bold">MAP</td>
                                            <td className="py-2 pr-4 font-bold">234 bytes</td>
                                            <td className="py-2 pr-4 font-bold">58</td>
                                            <td className="py-2 font-bold">4.3x fewer tokens</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Next Steps</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>
                                <a href="https://github.com/cputer/mind/blob/main/benchmarks/FINAL_PATENT_RESULTS.md" target="_blank" rel="noopener" className="text-primary hover:underline">View Full Results</a> — Complete benchmark data
                            </li>
                            <li>
                                <a href="/docs/performance" className="text-primary hover:underline">Performance Overview</a> — Understand the performance characteristics
                            </li>
                            <li>
                                <a href="/docs/performance/faq" className="text-primary hover:underline">Performance FAQ</a> — Common questions answered
                            </li>
                        </ul>
                    </div>

                    <PageNavigation
                        prev={{ label: "Cookbook", href: "/docs/cookbook" }}
                        next={{ label: "Performance Overview", href: "/docs/performance" }}
                    />

                </main>
            </div>
        </div>
    );
}
