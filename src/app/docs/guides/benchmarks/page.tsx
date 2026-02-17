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
git clone https://github.com/star-ga/mind.git
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
                            Compare MIND frontend compilation speed vs PyTorch torch.compile() (GPU, RTX 3080).
                        </p>
                        <CodeBlock className="mb-4">{`# Install PyTorch if needed
pip install torch

# Run comparison
python3 benchmarks/pytorch_comparison/benchmark_pytorch_compile.py`}</CodeBlock>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Expected Output</h4>
                            <pre className="text-sm text-muted bg-slate-50 p-3 rounded overflow-x-auto">
{`MIND (Criterion):                1.8-15.5 µs
PyTorch torch.compile GPU (RTX 3080): 99-878 ms
Ratio:                           35,000-176,000×`}
                            </pre>
                            <p className="text-sm text-muted mt-3">
                                <strong>Note:</strong> MIND measures frontend only (parse + typecheck + IR). PyTorch torch.compile() on GPU measures the full compilation pipeline including Triton/cuBLAS kernel generation. These are different scopes of work.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Mojo Comparison Benchmark</h2>
                        <p className="text-muted mb-4">
                            Compare MIND frontend compilation speed vs Mojo full LLVM compilation.
                        </p>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Results (February 2026)</h4>
                            <pre className="text-sm text-muted bg-slate-50 p-3 rounded overflow-x-auto">
{`MIND (Criterion):           1.8-6.1 µs
Mojo 0.26.1 (mojo build):  810-829 ms
Ratio:                      135,000-458,000×`}
                            </pre>
                            <p className="text-sm text-muted mt-3">
                                <strong>Note:</strong> MIND measures frontend only (parse + typecheck + IR). Mojo <code>mojo build</code> performs full LLVM compilation to a native binary. Different scopes of work.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">JAX Comparison Benchmark</h2>
                        <p className="text-muted mb-4">
                            Compare MIND frontend compilation speed vs JAX cold-start XLA compilation.
                        </p>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Results (February 2026)</h4>
                            <pre className="text-sm text-muted bg-slate-50 p-3 rounded overflow-x-auto">
{`MIND (Criterion):                   1.8-6.1 µs
JAX 0.9 (jax.jit cold-start XLA):  37.5-360.5 ms
Ratio:                              21,200-95,100×`}
                            </pre>
                            <p className="text-sm text-muted mt-3">
                                <strong>Note:</strong> MIND measures frontend only (parse + typecheck + IR). JAX <code>jax.jit()</code> performs full XLA compilation (HLO lowering + optimization + code generation). Cache disabled via <code>JAX_ENABLE_COMPILATION_CACHE=0</code>. Different scopes of work.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Real Compilation Time (Criterion)</h2>
                        <p className="text-muted mb-4">
                            Measure MIND&apos;s true compilation time with in-process Criterion benchmarks.
                        </p>
                        <CodeBlock className="mb-4">{`# Run Criterion benchmarks (in-process, no subprocess overhead)
cargo bench --bench compiler
cargo bench --bench simple_benchmarks`}</CodeBlock>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <h4 className="font-semibold mb-2">Expected Output (v0.2.1+)</h4>
                            <pre className="text-sm text-muted bg-slate-50 p-3 rounded overflow-x-auto">
{`compiler_pipeline/parse_typecheck_ir/small_matmul
                        time:   [1.75 µs 1.77 µs 1.80 µs]
compiler_pipeline/parse_typecheck_ir/medium_mlp
                        time:   [2.85 µs 2.88 µs 2.92 µs]
compiler_pipeline/parse_typecheck_ir/large_network
                        time:   [4.68 µs 4.75 µs 4.83 µs]`}
                            </pre>
                            <p className="text-sm text-muted mt-3">
                                <strong>In-process Criterion benchmarks</strong> — no process spawning, no FFI overhead. Results may vary ±10% by hardware.
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
                            This reveals MIND&apos;s <strong>true compilation performance: 1.8-15.5 µs</strong> (varies by machine)
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-4">Subprocess vs Direct Call</h3>
                        <div className="bg-card border border-border rounded-lg p-4 mb-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-2 text-muted">subprocess.run(&quot;mind compile&quot;)</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        <li>Spawn process: ~2-3 ms</li>
                                        <li>IPC overhead: ~1-2 ms</li>
                                        <li>Actual compile: 1.8-15.5 µs</li>
                                        <li className="font-semibold border-t pt-1 mt-2">TOTAL: ~5 ms</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-emerald-700">mind.compile() (Python binding)</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        <li>Direct function call: ~0 µs</li>
                                        <li>Actual compile: 1.8-15.5 µs</li>
                                        <li className="font-semibold border-t pt-1 mt-2 text-emerald-700">TOTAL: 1.8-15.5 µs</li>
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
                                        <td className="py-2">February 2026</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">Platform</td>
                                        <td className="py-2">Ubuntu 24.04, Linux 6.17, x86_64</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">GPU</td>
                                        <td className="py-2">RTX 3080, CUDA 12.8</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">PyTorch</td>
                                        <td className="py-2">2.10.0+cu128</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">JAX</td>
                                        <td className="py-2">0.9.0.1</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-semibold">Mojo</td>
                                        <td className="py-2">0.26.1.0</td>
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
                                <a href="https://github.com/star-ga/mind/blob/main/benchmarks/FINAL_PATENT_RESULTS.md" target="_blank" rel="noopener" className="text-primary hover:underline">View Full Results</a> — Complete benchmark data
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
