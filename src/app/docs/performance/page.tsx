import { Metadata } from "next";
import Link from "next/link";
import { docsNavigation } from "@/data/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
    title: "Performance",
    description: "MIND performance characteristics, optimization levels, and benchmarking.",
};

export default function PerformancePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <nav className="sticky top-24">
                        {docsNavigation.map((section) => (
                            <div key={section.title} className="mb-6">
                                <h3 className="font-heading font-bold text-sm text-foreground mb-2">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`text-sm font-medium transition-colors block py-1 ${item.href === "/docs/performance" ? "!text-primary font-bold" : "!text-slate-600 hover:!text-primary"}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Performance</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND targets performance within 2x of hand-tuned implementations for common operations, while maintaining determinism and safety guarantees by default.
                        </p>

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
                                        <td className="py-2 pr-4">Maximum performance, relaxed FP</td>
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

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full performance specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/performance.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/performance.md
                            </a>.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
