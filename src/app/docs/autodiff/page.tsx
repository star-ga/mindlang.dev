import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Automatic Differentiation",
    description: "MIND autodiff engine, gradient computation, and differentiable programming.",
};

export default function AutodiffPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/autodiff" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/autodiff" />
                    <h1 className="page-title mt-4">Automatic Differentiation</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND includes a built-in autodiff engine that generates optimized gradient code at the IR level using reverse-mode automatic differentiation.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Basic Usage</h2>
                        <p className="text-muted mb-4">
                            Mark functions as differentiable to enable gradient computation:
                        </p>
                        <CodeBlock className="mb-8">{`@differentiable
fn mse_loss(pred: Tensor<f32, N>, target: Tensor<f32, N>) -> f32 {
    mean((pred - target) ** 2)
}

fn main() {
    let pred = [1.0, 2.0, 3.0];
    let target = [1.5, 2.5, 3.5];

    // Compute loss
    let loss = mse_loss(pred, target);

    // Get gradient function
    let grad_fn = grad(mse_loss);
    let d_pred = grad_fn(pred, target);

    print(d_pred);  // Gradient w.r.t. pred
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">How It Works</h2>
                        <p className="text-muted mb-4">
                            MIND uses source-transformation reverse-mode AD:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Forward pass</strong>: Compute output while recording operations</li>
                            <li><strong>Backward pass</strong>: Propagate gradients through recorded operations</li>
                            <li><strong>Optimization</strong>: Apply standard compiler optimizations to gradient code</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Supported Operations</h2>
                        <p className="text-muted mb-4">
                            All Core v1 operations have defined gradients:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Operation</th>
                                        <th className="text-left py-2 font-bold">Gradient</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>add(a, b)</code></td>
                                        <td className="py-2">∂a = upstream, ∂b = upstream</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>mul(a, b)</code></td>
                                        <td className="py-2">∂a = upstream * b, ∂b = upstream * a</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>matmul(a, b)</code></td>
                                        <td className="py-2">∂a = upstream @ bᵀ, ∂b = aᵀ @ upstream</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>relu(x)</code></td>
                                        <td className="py-2">upstream * (x &gt; 0)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4"><code>sum(x)</code></td>
                                        <td className="py-2">broadcast(upstream, shape(x))</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Higher-Order Gradients</h2>
                        <CodeBlock className="mb-8">{`@differentiable
fn f(x: f32) -> f32 {
    x ** 3
}

// First derivative: 3x²
let df = grad(f);

// Second derivative: 6x
let d2f = grad(df);

// Third derivative: 6
let d3f = grad(d2f);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Custom Gradients</h2>
                        <CodeBlock className="mb-8">{`@differentiable
@custom_grad(my_relu_grad)
fn my_relu(x: Tensor<f32, N>) -> Tensor<f32, N> {
    max(x, 0.0)
}

fn my_relu_grad(x: Tensor<f32, N>, upstream: Tensor<f32, N>) -> Tensor<f32, N> {
    upstream * cast<f32>(x > 0.0)
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Gradient Checkpointing</h2>
                        <p className="text-muted mb-4">
                            For memory-constrained training, use checkpointing:
                        </p>
                        <CodeBlock className="mb-8">{`@differentiable
@checkpoint  // Recompute forward during backward
fn transformer_block(x: Tensor<f32, B, S, D>) -> Tensor<f32, B, S, D> {
    // Large intermediate activations are not stored
    let attn = self_attention(x);
    let ffn = feed_forward(attn);
    ffn
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full autodiff specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/autodiff.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/autodiff.md
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Shapes & Broadcasting", href: "/docs/shapes" }}
                        next={{ label: "Errors", href: "/docs/errors" }}
                    />

                </main>
            </div>
        </div>
    );
}
