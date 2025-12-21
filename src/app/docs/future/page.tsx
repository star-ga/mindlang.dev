import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Future Extensions",
    description: "Planned features and extensions for MIND language and runtime.",
};

export default function FuturePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/future" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Future Extensions</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            This page outlines planned extensions to the MIND language and runtime. These features are under active development or consideration for future releases.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Phase 13: BCI & Neuroscience</h2>
                        <p className="text-muted mb-4">
                            Optimizations for brain-computer interface and real-time neural processing:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Ultra-low latency paths</strong>: Target {"<"}1ms inference for real-time neural decoding</li>
                            <li><strong>Streaming tensors</strong>: Continuous data ingestion with sliding windows</li>
                            <li><strong>Pre-allocated memory pools</strong>: Eliminate allocation jitter</li>
                            <li><strong>Signal processing primitives</strong>: FFT, bandpass filtering, online normalization</li>
                            <li><strong>@realtime annotation</strong>: Latency-critical function marking</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Distributed Training</h2>
                        <p className="text-muted mb-4">
                            Multi-node training support for large models (see <Link href="/docs/distributed" className="text-primary hover:underline">Distributed Execution Guide</Link>):
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Data parallelism with automatic gradient synchronization</li>
                            <li>Model parallelism for models exceeding single-device memory</li>
                            <li>Pipeline parallelism for improved throughput</li>
                            <li>Integration with collective communication libraries (NCCL, Gloo)</li>
                            <li>Elastic training with fault tolerance and automatic recovery</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Production Deployment</h2>
                        <p className="text-muted mb-4">
                            Full-stack deployment infrastructure (see <Link href="/docs/deployment" className="text-primary hover:underline">Deployment Guide</Link>):
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>One-command deployment to cloud, edge, and on-premise</li>
                            <li>Containerized serving with auto-scaling</li>
                            <li>A/B testing and canary deployments</li>
                            <li>Model versioning and rollback</li>
                            <li>Built-in monitoring with OpenTelemetry integration</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Sparse Tensors</h2>
                        <p className="text-muted mb-4">
                            First-class support for sparse data:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Sparse tensor types (CSR, CSC, COO formats)</li>
                            <li>Sparse-aware autodiff</li>
                            <li>Optimized sparse-dense operations</li>
                            <li>Graph neural network primitives</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Quantization</h2>
                        <p className="text-muted mb-4">
                            Built-in quantization for efficient inference:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>INT8/INT4 quantization with calibration</li>
                            <li>Mixed-precision training (FP16/BF16)</li>
                            <li>Quantization-aware training</li>
                            <li>Post-training quantization tools</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Hardware Targets</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Target</th>
                                        <th className="text-left py-2 pr-4 font-bold">Status</th>
                                        <th className="text-left py-2 font-bold">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">x86-64 CPU</td>
                                        <td className="py-2 pr-4 text-emerald-600">Stable</td>
                                        <td className="py-2">AVX2/AVX-512 vectorization</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">ARM64 CPU</td>
                                        <td className="py-2 pr-4 text-emerald-600">Stable</td>
                                        <td className="py-2">NEON vectorization</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">NVIDIA GPU</td>
                                        <td className="py-2 pr-4 text-amber-600">Mock Ready</td>
                                        <td className="py-2">MockGpuBackend (CPU delegation); native CUDA 12 planned</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">AMD GPU</td>
                                        <td className="py-2 pr-4 text-amber-600">Mock Ready</td>
                                        <td className="py-2">MockGpuBackend (CPU delegation); native ROCm planned</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">WebGPU</td>
                                        <td className="py-2 pr-4 text-slate-500">Planned</td>
                                        <td className="py-2">Browser-based inference</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Apple Silicon</td>
                                        <td className="py-2 pr-4 text-amber-600">Mock Ready</td>
                                        <td className="py-2">MockGpuBackend (CPU delegation); native Metal planned</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Developer Tooling</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Language Server Protocol (LSP)</strong>: IDE integration with autocomplete, diagnostics</li>
                            <li><strong>Formatter</strong>: Opinionated code formatter (mindfmt)</li>
                            <li><strong>Debugger</strong>: Step-through debugging with tensor inspection</li>
                            <li><strong>Profiler UI</strong>: Visual flame graphs and memory analysis</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full future extensions specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/future-extensions.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/future-extensions.md
                            </a>{" "}
                            and the <Link href="/roadmap" className="text-primary hover:underline">Roadmap</Link> for timeline information.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Performance", href: "/docs/performance" }}
                        next={{ label: "Contributing", href: "/docs/contributing" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/future" />
                </main>
            </div>
        </div>
    );
}
