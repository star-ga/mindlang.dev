import { Metadata } from "next";
import Link from "next/link";
import { docsNavigation } from "@/data/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
    title: "Installation",
    description: "Get up and running with the MIND compiler toolchain.",
};

export default function InstallationPage() {
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
                                                className={`text-sm font-medium transition-colors block py-1 ${item.href === "/docs/installation" ? "!text-primary font-bold" : "!text-slate-600 hover:!text-primary"}`}
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
                    <h1 className="page-title mt-4">Installation</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Get up and running with the MIND compiler toolchain.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Prerequisites</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Linux (x86_64) or macOS (Apple Silicon/Intel)</li>
                            <li>Rust toolchain (stable), <code>cmake</code>, and a modern C/C++ toolchain</li>
                        </ul>

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
                </main>
            </div>
        </div>
    );
}

