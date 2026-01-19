import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Standard Library: Core",
    description: "Core module of the MIND standard library.",
};

export default function StdCorePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/std/core" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/std/core" />
                    <h1 className="page-title mt-4">Standard Library: Core</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            The <code>core</code> module provides foundational types and utilities for the MIND language.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Key Exports</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><code>Option&lt;T&gt;</code> — Represents an optional value.</li>
                            <li><code>Result&lt;T, E&gt;</code> — Standard error handling type.</li>
                            <li><code>panic!</code> — Terminates execution with an error message.</li>
                            <li><code>assert!</code> — Runtime assertions for debugging.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example Usage</h2>
                        <CodeBlock>{`use core::{Option, Result};

fn divide(a: f32, b: f32) -> Result<f32, String> {
    if b == 0.0 {
        return Err("division by zero".to_string());
    }
    Ok(a / b)
}`}</CodeBlock>
                    </div>

                    <PageNavigation
                        prev={{ label: "Errors", href: "/docs/errors" }}
                        next={{ label: "Tensor", href: "/docs/std/tensor" }}
                    />

                </main>
            </div>
        </div>
    );
}
