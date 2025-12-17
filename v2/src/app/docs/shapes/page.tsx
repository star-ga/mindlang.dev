import { Metadata } from "next";
import Link from "next/link";
import { docsNavigation } from "@/data/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
    title: "Shapes & Broadcasting",
    description: "Core v1 shapes, broadcasting rules, and the reference shape engine.",
};

export default function ShapesPage() {
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
                                                className={`text-sm font-medium transition-colors block py-1 ${item.href === "/docs/shapes" ? "!text-primary font-bold" : "!text-slate-600 hover:!text-primary"}`}
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
                    <h1 className="page-title mt-4">Shapes & Broadcasting</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Core v1 treats tensor shapes as ordered lists of extents. This page explains the practical rules used by the compiler and runtime.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Ranks and shapes</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Scalars are rank-0 tensors with an empty shape <code>[]</code>.</li>
                            <li>Vectors and matrices are rank-1 and rank-2 respectively.</li>
                            <li>Higher-rank tensors are just longer shape lists, e.g. <code>[2, 3, 4]</code>.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Broadcasting in practice</h2>
                        <p className="text-muted mb-4">Most Core v1 operators are <strong>elementwise</strong> and follow numpy-style broadcasting:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-4">
                            <li>Shapes are aligned from the right.</li>
                            <li>Each dimension must either match or be <code>1</code> on one side.</li>
                            <li>If neither side is <code>1</code> and the extents differ, broadcasting fails.</li>
                        </ul>
                        <p className="text-muted mb-4">The reference implementation exposes the helper:</p>
                        <CodeBlock className="mb-8">{`use mind::shapes::engine::broadcast_shapes;

let a = [2, 3];
let b = [1, 3];
let out = broadcast_shapes(&a, &b).unwrap();
assert_eq!(out, vec![2, 3]);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Shape rules by operator kind</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Unary elementwise</strong> (<code>tensor.relu</code>, <code>tensor.exp</code>): output shape equals input shape.</li>
                            <li><strong>Binary elementwise</strong> (<code>tensor.add</code>, <code>tensor.mul</code>): output shape is the broadcasted shape of the two inputs.</li>
                            <li><strong>Full reduction</strong> (<code>tensor.sum_all</code>): reduces all axes to a scalar (<code>[]</code>).</li>
                            <li><strong>2D matmul</strong> (<code>tensor.matmul</code>): both inputs must be rank-2, and shapes must satisfy <code>A: [M, K], B: [K, N]</code>, producing <code>[M, N]</code>.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Reference shape engine</h2>
                        <p className="text-muted mb-4">The reference shape engine lives in the main compiler repository:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>Module: <code>mind::shapes::engine</code></li>
                            <li>Tests: <code>tests/shapes_engine.rs</code></li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}
