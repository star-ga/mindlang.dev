import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Installation",
    description: "Get up and running with the MIND compiler toolchain.",
};

export default function InstallationPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/installation" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/installation" />
                    <h1 className="page-title mt-4">Installation</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Get up and running with the MIND compiler toolchain.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Prerequisites</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Linux (x86_64) or macOS (Apple Silicon/Intel)</li>
                            <li>Rust toolchain (<strong>stable</strong> channel required), <code>cmake</code>, and a modern C/C++ toolchain</li>
                        </ul>
                        <p className="text-muted mb-8">
                            Ensure your Rust toolchain is up to date: <code>rustup update stable</code>
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Build from source</h2>
                        <p className="text-muted mb-4">
                            The compiler and CLI live in the public <code>star-ga/mind</code> repository.
                        </p>
                        <CodeBlock className="mb-8">{`git clone https://github.com/star-ga/mind.git
cd mind
cargo build --bin mindc`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Verifying the build</h2>
                        <p className="text-muted mb-4">
                            Run the compiled binary to confirm it links correctly:
                        </p>
                        <CodeBlock>{`cargo run --bin mindc -- --help`}</CodeBlock>
                    </div>

                    <PageNavigation
                        prev={{ label: "Quick Start", href: "/docs/quick-start" }}
                        next={{ label: "Using Core v1", href: "/docs/using-core-v1" }}
                    />

                </main>
            </div>
        </div>
    );
}

