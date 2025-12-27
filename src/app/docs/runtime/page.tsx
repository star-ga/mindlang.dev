import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Runtime",
    description: "MIND runtime architecture, execution model, and deployment options.",
};

export default function RuntimePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/runtime" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Runtime</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            The MIND runtime provides deterministic execution of compiled models with minimal overhead. It supports multiple deployment modes from embedded devices to cloud servers.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Architecture</h2>
                        <CodeBlock className="mb-4">{`┌─────────────────────────────────────┐
│           Application               │
├─────────────────────────────────────┤
│         Runtime API (C/Rust)        │
├─────────────────────────────────────┤
│    Executor    │   Memory Manager   │
├────────────────┼────────────────────┤
│   CPU Backend  │   GPU Backends     │
│   (Stable)     │ CUDA|Metal|ROCm|WebGPU│
└────────────────┴────────────────────┘`}</CodeBlock>
                        <p className="text-sm text-muted mb-8">
                            <strong>GPU Backend:</strong> Production CUDA 12.8+ backend available via Enterprise license. All 4 GPU backends (CUDA, Metal, ROCm, WebGPU) are production-ready.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">GPU Runtime (Enterprise)</h2>
                        <p className="text-muted mb-4">
                            The Enterprise GPU runtime provides production-grade GPU acceleration across 4 backends:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>cuBLAS/cuDNN</strong>: TF32 Tensor Cores for matmul, auto-tuned convolutions</li>
                            <li><strong>Memory Allocator</strong>: CachingAllocator achieves 8.3M allocs/sec (180x faster than cudaMalloc)</li>
                            <li><strong>Tensor Cores</strong>: TF32, FP16, FP8 (Ada Lovelace+) with PTX mma.sync</li>
                            <li><strong>Async Streams</strong>: 8 streams (6 compute, 2 transfer) for overlapped execution</li>
                            <li><strong>Supported GPUs</strong>: SM_80+ (Ampere, Ada Lovelace, Hopper)</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Execution Modes</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Mode</th>
                                        <th className="text-left py-2 pr-4 font-bold">Use Case</th>
                                        <th className="text-left py-2 font-bold">Characteristics</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">AOT (Ahead-of-Time)</td>
                                        <td className="py-2 pr-4">Production deployment</td>
                                        <td className="py-2">Fastest startup, smallest binary</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">JIT (Just-in-Time)</td>
                                        <td className="py-2 pr-4">Development, dynamic shapes</td>
                                        <td className="py-2">Flexible, runtime optimization</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Interpreter</td>
                                        <td className="py-2 pr-4">Debugging, conformance</td>
                                        <td className="py-2">Reference implementation</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Memory Management</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Static allocation</strong>: Memory planned at compile time for AOT</li>
                            <li><strong>Arena allocator</strong>: Fast bump allocation for intermediate tensors</li>
                            <li><strong>Buffer reuse</strong>: Automatic sharing of memory between non-overlapping tensors</li>
                            <li><strong>Device memory</strong>: Unified API for CPU and GPU memory</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Determinism Guarantees</h2>
                        <p className="text-muted mb-4">
                            The runtime provides strong determinism guarantees:
                        </p>
                        <CodeBlock className="mb-8">{`// Create runtime with deterministic mode (default)
let rt = Runtime::new(RuntimeConfig {
    deterministic: true,  // IEEE 754 strict, no threading non-determinism
    seed: 42,             // RNG seed for reproducibility
});

// Same inputs always produce same outputs
let out1 = model.forward(&input);
let out2 = model.forward(&input);
assert_eq!(out1, out2);  // Guaranteed`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Resource Limits</h2>
                        <CodeBlock className="mb-8">{`let config = RuntimeConfig {
    max_memory_mb: 1024,      // Memory limit
    max_threads: 4,           // Thread pool size
    timeout_ms: Some(5000),   // Execution timeout
    ..Default::default()
};

let rt = Runtime::new(config);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Profiling</h2>
                        <CodeBlock className="mb-8">{`// Enable profiling
let rt = Runtime::new(RuntimeConfig {
    profile: true,
    ..Default::default()
});

model.forward(&input);

// Get profile data
let profile = rt.get_profile();
for op in profile.operations {
    println!("{}: {}ms", op.name, op.duration_ms);
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full runtime specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/runtime.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/runtime.md
                            </a>{" "}
                            and the runtime repository at{" "}
                            <a href="https://github.com/cputer/mind-runtime" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-runtime
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "MLIR Lowering", href: "/docs/mlir" }}
                        next={{ label: "FFI & Bindings", href: "/docs/ffi" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/runtime" />
                </main>
            </div>
        </div>
    );
}
