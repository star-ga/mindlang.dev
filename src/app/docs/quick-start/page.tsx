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

                        {/* Quick Install */}
                        <div className="bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-bold text-foreground mb-2">Quick Install (Recommended)</h3>
                            <p className="text-sm text-muted mb-4">
                                One command to install MIND with all dependencies:
                            </p>
                            <CodeBlock>{`curl -fsSL https://mindlang.dev/install.sh | sh`}</CodeBlock>
                            <p className="text-xs text-muted mt-3">
                                This will install Rust (if needed), clone the repo, build the compiler, and add <code>mind</code> to your PATH.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Manual Installation</h2>
                        <p className="text-muted mb-4">
                            Alternatively, build from source manually:
                        </p>

                        <h3 className="text-xl font-bold font-heading mt-8 mb-4">1. Clone & build the compiler</h3>
                        <p className="text-muted mb-4">
                            Use the public compiler repo and build the CLI from source:
                        </p>
                        <CodeBlock className="mb-8">{`git clone https://github.com/star-ga/mind.git
cd mind
cargo build --release --bin mindc`}</CodeBlock>

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
