import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Standard Library: Tensor",
    description: "Tensor module of the MIND standard library.",
};

export default function StdTensorPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/std/tensor" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Standard Library: Tensor</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            The <code>tensor</code> module provides the core tensor types and operations for numerical computation.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Key Exports</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><code>Tensor&lt;T, Shape&gt;</code> — The primary tensor type with static shape.</li>
                            <li><code>zeros</code>, <code>ones</code>, <code>full</code> — Tensor constructors.</li>
                            <li><code>add</code>, <code>mul</code>, <code>matmul</code> — Element-wise and matrix operations.</li>
                            <li><code>sum</code>, <code>mean</code>, <code>max</code> — Reduction operations.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example Usage</h2>
                        <CodeBlock>{`use tensor::{Tensor, zeros, ones};

fn main() {
    let a: Tensor<f32>[2, 3] = zeros();
    let b: Tensor<f32>[2, 3] = ones();
    let c = a + b;  // Broadcasting add
    print(c);
}`}</CodeBlock>
                    </div>

                    <PageNavigation
                        prev={{ label: "Core", href: "/docs/std/core" }}
                        next={{ label: "Math", href: "/docs/std/math" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/std/tensor" />
                </main>
            </div>
        </div>
    );
}
