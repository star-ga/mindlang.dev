import { Metadata } from "next";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Quick Start",
    description: "Write and run your first Tensor program in 5 minutes.",
};

export default function QuickStartPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/quick-start" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/quick-start" />
                    <h1 className="page-title mt-4">Quick Start</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Write and run your first Tensor program in 5 minutes.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">1. Clone & build the compiler</h2>
                        <p className="text-muted mb-4">
                            Use the public compiler repo and build the CLI from source:
                        </p>
                        <CodeBlock className="mb-8">{`git clone https://github.com/star-ga/mind.git
cd mind
cargo build --bin mindc`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">2. Inspect the sample program</h2>
                        <p className="text-muted mb-4">
                            The repository ships with <code>examples/hello_tensor.mind</code>. You can emit the typed SSA IR directly from the CLI:
                        </p>
                        <CodeBlock className="mb-8">{`cargo run --bin mindc -- examples/hello_tensor.mind --emit-ir`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">3. Different compiler outputs</h2>
                        <p className="text-muted mb-4">
                            Generate gradient IR or MLIR using the same example and feature flags:
                        </p>
                        <CodeBlock>{`# Gradient IR for main()
cargo run --bin mindc -- examples/hello_tensor.mind --func main --autodiff --emit-grad-ir

# MLIR lowering (feature-gated)
cargo run --features "mlir-lowering autodiff" --bin mindc -- examples/hello_tensor.mind --func main --autodiff --emit-mlir`}</CodeBlock>
                    </div>

                    <PageNavigation
                        next={{ label: "Installation", href: "/docs/installation" }}
                    />
                </main>
            </div>
        </div>
    );
}
