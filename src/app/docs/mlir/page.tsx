import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "MLIR Lowering",
    description: "MIND to MLIR lowering pipeline and dialect design.",
};

export default function MLIRPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/mlir" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">MLIR Lowering</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND uses MLIR (Multi-Level Intermediate Representation) as its backend infrastructure, enabling powerful optimizations and multi-target code generation.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Lowering Pipeline</h2>
                        <CodeBlock className="mb-8">{`MIND IR
    ↓
mind dialect (high-level tensor ops)
    ↓
linalg dialect (loop-based tensor ops)
    ↓
scf dialect (structured control flow)
    ↓
arith + memref dialects
    ↓
llvm dialect
    ↓
LLVM IR → Machine Code`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">MIND Dialect</h2>
                        <p className="text-muted mb-4">
                            The custom MIND dialect represents high-level tensor operations:
                        </p>
                        <CodeBlock className="mb-8">{`// MIND dialect example
%result = mind.matmul %a, %b : tensor<2x3xf32>, tensor<3x4xf32> -> tensor<2x4xf32>
%activated = mind.relu %result : tensor<2x4xf32>
%reduced = mind.sum %activated {axis = 1} : tensor<2x4xf32> -> tensor<2xf32>`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Optimization Passes</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Operator Fusion</strong>: Combine sequential ops to reduce memory traffic</li>
                            <li><strong>Layout Optimization</strong>: Select optimal memory layouts (row-major, column-major)</li>
                            <li><strong>Tiling</strong>: Break large operations into cache-friendly tiles</li>
                            <li><strong>Vectorization</strong>: Use SIMD instructions where available</li>
                            <li><strong>Buffer Placement</strong>: Optimize memory allocation and reuse</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">GPU Lowering Path</h2>
                        <p className="text-muted mb-4">
                            For GPU targets, additional dialects are used:
                        </p>
                        <CodeBlock className="mb-8">{`mind dialect
    ↓
linalg on tensors
    ↓
linalg on buffers
    ↓
gpu dialect (kernel outline)
    ↓
nvvm dialect (NVIDIA) or spirv dialect (Vulkan/OpenCL)
    ↓
PTX / SPIR-V`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example Transformation</h2>
                        <p className="text-muted mb-4">Before fusion:</p>
                        <CodeBlock className="mb-4">{`%0 = mind.relu %input : tensor<1024xf32>
%1 = mind.mul %0, %scale : tensor<1024xf32>
%2 = mind.add %1, %bias : tensor<1024xf32>`}</CodeBlock>
                        <p className="text-muted mb-4">After fusion (conceptual example — actual fused operations may vary):</p>
                        <CodeBlock className="mb-8">{`// Hypothetical fused operation for illustration
%0 = mind.fused_relu_scale_bias %input, %scale, %bias : tensor<1024xf32>
// Single memory pass instead of three`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Inspecting IR</h2>
                        <p className="text-muted mb-4">
                            Use compiler flags to inspect intermediate representations:
                        </p>
                        <CodeBlock className="mb-8">{`# Dump MIND dialect
mindc --emit=mind-dialect model.mind

# Dump linalg dialect
mindc --emit=linalg model.mind

# Dump LLVM IR
mindc --emit=llvm model.mind

# Dump assembly
mindc --emit=asm model.mind`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full MLIR lowering specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/mlir-lowering.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/mlir-lowering.md
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "IR", href: "/docs/ir" }}
                        next={{ label: "Runtime", href: "/docs/runtime" }}
                    />
                </main>
            </div>
        </div>
    );
}
