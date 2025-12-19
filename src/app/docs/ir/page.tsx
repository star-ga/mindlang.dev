import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Intermediate Representation",
    description: "MIND IR structure, operations, and lowering pipeline.",
};

export default function IRPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/ir" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Intermediate Representation</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            The MIND IR is a typed, SSA-based intermediate representation designed for tensor operations and automatic differentiation.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">IR Structure</h2>
                        <p className="text-muted mb-4">
                            MIND IR uses Static Single Assignment (SSA) form with explicit types:
                        </p>
                        <CodeBlock className="mb-8">{`// Example IR for: y = relu(x @ w)
%0 = mind.const : tensor<2x2xf32> = [[1.0, 2.0], [3.0, 4.0]]
%1 = mind.randn : tensor<2x2xf32>
%2 = mind.matmul(%0, %1) : tensor<2x2xf32>
%3 = mind.relu(%2) : tensor<2x2xf32>
mind.return %3`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Core Operations</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Category</th>
                                        <th className="text-left py-2 font-bold">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Arithmetic</td>
                                        <td className="py-2">add, sub, mul, div, neg, pow</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Linear Algebra</td>
                                        <td className="py-2">matmul, transpose, dot</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Activations</td>
                                        <td className="py-2">relu, sigmoid, tanh, softmax, gelu</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Reductions</td>
                                        <td className="py-2">sum, mean, max, min, prod</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Shape</td>
                                        <td className="py-2">reshape, broadcast, squeeze, unsqueeze</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Convolution</td>
                                        <td className="py-2">conv2d, maxpool2d, avgpool2d</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Type Representation</h2>
                        <p className="text-muted mb-4">
                            IR types encode both dtype and shape information:
                        </p>
                        <CodeBlock className="mb-8">{`tensor<f32>           // Scalar
tensor<10xf32>        // 1D, static shape
tensor<2x3xf32>       // 2D, static shape
tensor<?x?xf32>       // 2D, dynamic shape
tensor<2x?xf32>       // Mixed static/dynamic`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Canonicalization</h2>
                        <p className="text-muted mb-4">
                            The IR undergoes canonicalization passes to normalize operations:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Constant folding for compile-time-known values</li>
                            <li>Identity elimination (x + 0 → x, x * 1 → x)</li>
                            <li>Strength reduction (x * 2 → x + x for integers)</li>
                            <li>Dead code elimination</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Lowering Pipeline</h2>
                        <CodeBlock className="mb-8">{`Source (.mind)
    ↓ Parse
AST
    ↓ Type check
Typed AST
    ↓ Lower
MIND IR (High-level)
    ↓ Canonicalize
MIND IR (Canonical)
    ↓ Autodiff (if needed)
MIND IR + Gradients
    ↓ Lower to MLIR
MLIR Dialects
    ↓ Lower to LLVM
LLVM IR
    ↓ Codegen
Machine Code`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full IR specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/ir.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/ir.md
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Math", href: "/docs/std/math" }}
                        next={{ label: "MLIR Lowering", href: "/docs/mlir" }}
                    />
                </main>
            </div>
        </div>
    );
}
