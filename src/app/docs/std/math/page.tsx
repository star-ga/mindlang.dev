import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Standard Library: Math",
    description: "Math module of the MIND standard library.",
};

export default function StdMathPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/std/math" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Standard Library: Math</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            The <code>math</code> module provides common mathematical functions for scalar and tensor operations.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Key Exports</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><code>sin</code>, <code>cos</code>, <code>tan</code> — Trigonometric functions.</li>
                            <li><code>exp</code>, <code>log</code>, <code>log10</code> — Exponential and logarithmic functions.</li>
                            <li><code>sqrt</code>, <code>pow</code>, <code>abs</code> — Power and absolute value functions.</li>
                            <li><code>relu</code>, <code>sigmoid</code>, <code>tanh</code> — Activation functions for ML.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example Usage</h2>
                        <CodeBlock>{`use math::{exp, relu, sigmoid};

fn softmax(x: Tensor<f32>[N]) -> Tensor<f32>[N] {
    let e = exp(x);
    return e / sum(e);
}

fn main() {
    let logits: Tensor<f32>[4] = [1.0, 2.0, 3.0, 4.0];
    let probs = softmax(logits);
    print(probs);
}`}</CodeBlock>
                    </div>

                    <PageNavigation
                        prev={{ label: "Tensor", href: "/docs/std/tensor" }}
                        next={{ label: "IR", href: "/docs/ir" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/std/math" />
                </main>
            </div>
        </div>
    );
}
