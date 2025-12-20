import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Conformance",
    description: "Core v1 conformance profiles for CPU and GPU implementations.",
};

export default function ConformancePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/conformance" />

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
                            <li>Conformance expectations are defined in the Core spec under <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/conformance.md" target="_blank" rel="noopener" className="text-primary hover:underline">conformance.md</a>.</li>
                            <li>Run the official suite locally with: <code>mindc conformance --profile cpu</code></li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Core v1 GPU profile</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-4">
                            <li>Optional profile for implementations that expose GPU or accelerator devices.</li>
                            <li>Supports full Core v1 op surface (19 operations) with GPU-specific constraints.</li>
                            <li>Reference implementation: <code>MockGpuBackend</code> executes via CPU delegation for conformance testing.</li>
                        </ul>
                        <p className="text-muted mb-2 font-medium">GPU tensor constraints:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><code>DeviceKind::Gpu</code> device targeting</li>
                            <li><code>dtype: f32</code> only (f64 not supported on GPU profile)</li>
                            <li><code>numel % 4 == 0</code> alignment requirement</li>
                            <li><code>fill</code> reads value from <code>inputs[0].data[0]</code> (first element)</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Running the conformance suite</h2>
                        <p className="text-muted mb-4">From the <code>cputer/mind</code> repo, run the Rust test harness:</p>
                        <CodeBlock className="mb-4">{`cargo test -p mind-compiler --test conformance`}</CodeBlock>
                        <p className="text-muted mb-4">From any environment with <code>mindc</code> installed:</p>
                        <CodeBlock className="mb-8">{`mindc conformance --profile cpu
mindc conformance --profile gpu`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">For other implementations</h2>
                        <p className="text-muted">
                            The conformance corpus is intended to be reused—port the tests to your runtime or run them through a compatibility shim.
                            Opening issues or PRs against <a href="https://github.com/cputer/mind-spec" target="_blank" rel="noopener" className="text-primary hover:underline">mind-spec</a> is the best way to clarify expectations.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "FFI", href: "/docs/ffi" }}
                        next={{ label: "Stability", href: "/docs/stability" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/conformance" />
                </main>
            </div>
        </div>
    );
}
