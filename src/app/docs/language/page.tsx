import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Language",
    description: "MIND language syntax, types, and core constructs.",
};

export default function LanguagePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/language" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/language" />
                    <h1 className="page-title mt-4">Language</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND is a statically-typed, tensor-native language designed for AI and numerical computing. This page covers the core syntax and type system.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Basic Syntax</h2>
                        <p className="text-muted mb-4">
                            MIND uses a Rust-inspired syntax with first-class tensor support:
                        </p>
                        <CodeBlock className="mb-8">{`// Function definition
fn relu(x: Tensor<f32, N, M>) -> Tensor<f32, N, M> {
    max(x, 0.0)
}

// Main entry point
fn main() {
    let x: Tensor<f32, 2, 3> = [[1.0, -2.0, 3.0], [-1.0, 2.0, -3.0]];
    let y = relu(x);
    print(y);
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Type System</h2>
                        <p className="text-muted mb-4">
                            MIND features a rich type system with compile-time shape checking:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Scalar types</strong>: <code>f32</code>, <code>f64</code>, <code>i32</code>, <code>i64</code>, <code>bool</code></li>
                            <li><strong>Tensor types</strong>: <code>Tensor&lt;dtype, ...dims&gt;</code> with static or dynamic shapes</li>
                            <li><strong>Generic dimensions</strong>: Use uppercase letters (<code>N</code>, <code>M</code>, <code>K</code>) for polymorphic shapes</li>
                            <li><strong>Device annotations</strong>: <code>@cpu</code>, <code>@gpu</code> for placement control</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Tensor Literals</h2>
                        <CodeBlock className="mb-8">{`// 1D tensor
let v: Tensor<f32, 3> = [1.0, 2.0, 3.0];

// 2D tensor (matrix)
let m: Tensor<f32, 2, 3> = [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]];

// Random initialization
let w: Tensor<f32, 784, 128> = randn();

// Zeros/ones
let zeros: Tensor<f32, 10, 10> = zeros();
let ones: Tensor<i32, 5> = ones();`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Functions</h2>
                        <CodeBlock className="mb-8">{`// Regular function
fn add(a: Tensor<f32, N>, b: Tensor<f32, N>) -> Tensor<f32, N> {
    a + b
}

// Differentiable function
@differentiable
fn loss(pred: Tensor<f32, N>, target: Tensor<f32, N>) -> f32 {
    mean((pred - target) ** 2)
}

// Generic over dtype
fn identity<T>(x: Tensor<T, N, M>) -> Tensor<T, N, M> {
    x
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Control Flow</h2>
                        <CodeBlock className="mb-8">{`// Conditionals
fn activation(x: f32, use_relu: bool) -> f32 {
    if use_relu {
        max(x, 0.0)
    } else {
        tanh(x)
    }
}

// Loops (bounded for determinism)
fn sum_first_n(x: Tensor<f32, 100>, n: i32) -> f32 {
    let mut acc = 0.0;
    for i in 0..n {
        acc = acc + x[i];
    }
    acc
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full language specification at{" "}
                            <a href="https://github.com/star-ga/mind-spec/blob/main/spec/v1.0/language.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/language.md
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Cookbook", href: "/docs/cookbook" }}
                        next={{ label: "Shapes & Broadcasting", href: "/docs/shapes" }}
                    />

                </main>
            </div>
        </div>
    );
}
