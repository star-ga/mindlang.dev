import { Metadata } from "next";
import Link from "next/link";
import { docsNavigation } from "@/data/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
    title: "Conformance",
    description: "Core v1 conformance profiles for CPU and GPU implementations.",
};

export default function ConformancePage() {
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
                                                className={`text-sm font-medium transition-colors block py-1 ${item.href === "/docs/conformance" ? "!text-primary font-bold" : "!text-slate-600 hover:!text-primary"}`}
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
                    <h1 className="page-title mt-4">Core v1 Conformance</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Core v1 defines compatibility expectations for runtimes targeting the MIND IR. This page explains the CPU and GPU profiles and shows how to run the official conformance suite.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Core v1 CPU baseline</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Guarantees deterministic execution for the full Core v1 op set on CPU, including shape inference, gradients, and canonical rewriting behavior.</li>
                            <li>Conformance expectations are defined in the Core spec under <a href="https://github.com/star-ga/mind-spec/blob/main/spec/v1.0/conformance.md" target="_blank" rel="noopener" className="text-primary hover:underline">conformance.md</a>.</li>
                            <li>Run the official suite locally with: <code>mindc conformance --profile cpu</code></li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Core v1 GPU profile</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Optional profile for implementations that expose GPU or accelerator devices.</li>
                            <li>Defines the device kinds/backends contract, backend-selection error model, and the public <code>GPUBackend</code> surface.</li>
                            <li>Profile guarantees cover capability reporting and deterministic fallback/error semantics.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Running the conformance suite</h2>
                        <p className="text-muted mb-4">From the <code>star-ga/mind</code> repo, run the Rust test harness:</p>
                        <CodeBlock className="mb-4">{`cargo test -p mind-compiler --test conformance`}</CodeBlock>
                        <p className="text-muted mb-4">From any environment with <code>mindc</code> installed:</p>
                        <CodeBlock className="mb-8">{`mindc conformance --profile cpu
mindc conformance --profile gpu`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">For other implementations</h2>
                        <p className="text-muted">
                            The conformance corpus is intended to be reused—port the tests to your runtime or run them through a compatibility shim.
                            Opening issues or PRs against <a href="https://github.com/star-ga/mind-spec" target="_blank" rel="noopener" className="text-primary hover:underline">mind-spec</a> is the best way to clarify expectations.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
