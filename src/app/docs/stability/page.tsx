import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Stability & Versioning",
    description: "Stability guarantees for the MIND IR, autodiff, shapes, and experimental areas.",
};

export default function StabilityPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/stability" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/stability" />
                    <h1 className="page-title mt-4">Stability & Versioning</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            This page summarizes which parts of the MIND toolchain are production-stable today and which remain experimental.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Stable</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Core IR (mind-spec Core v1):</strong> The SSA-based core IR defined in <a href="https://github.com/star-ga/mind-spec/tree/main/spec/v1.0" target="_blank" rel="noopener" className="text-primary hover:underline">mind-spec/spec/v1.0</a> is locked for compatibility guarantees.</li>
                            <li><strong>Autodiff:</strong> Reverse-mode differentiation over the core IR with deterministic gradient IR output.</li>
                            <li><strong>Shapes & broadcasting:</strong> Shape inference, static shapes, and broadcasting semantics are fixed for 1.0.</li>
                            <li><strong>Deterministic canonicalization:</strong> Canonical forms and rewrite ordering are stable to enable reproducible builds.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Conditionally Stable</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>MLIR lowering (feature-gated):</strong> Available behind compiler feature flags; interfaces may change.</li>
                            <li><strong>Core v1 GPU profile (contract):</strong> Device kinds / backend targets, backend-selection error model, and the <code>GPUBackend</code> trait surface are defined and stable when GPU features are enabled.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Experimental</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Concrete GPU backends:</strong> CUDA backend available via Enterprise license. Open-source GPU backends (ROCm, Metal, WebGPU) are experimental and in development.</li>
                            <li><strong>Package manager:</strong> Design specified in mind-spec; implementation is early. Dependency resolution and registry workflows are not yet finalized.</li>
                            <li><strong>Future ops / extensions:</strong> New operators and language extensions will ship behind experimental flags.</li>
                        </ul>

                        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-indigo-900">
                            <strong>Tip:</strong> Experimental areas may change without notice; feature flags are required for MLIR lowering. GPU backends require Enterprise license (CUDA) or are in development (ROCm, Metal, WebGPU).
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">References</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>Core IR and semantics: <a href="https://github.com/star-ga/mind-spec/tree/main/spec/v1.0" target="_blank" rel="noopener" className="text-primary hover:underline">mind-spec/spec/v1.0</a></li>
                            <li>Versioning policy and guarantees: <a href="https://github.com/star-ga/mind/blob/main/docs/versioning.md" target="_blank" rel="noopener" className="text-primary hover:underline">star-ga/mind/docs/versioning.md</a></li>
                        </ul>
                    </div>

                    <PageNavigation
                        prev={{ label: "Conformance", href: "/docs/conformance" }}
                        next={{ label: "Security", href: "/docs/security" }}
                    />

                </main>
            </div>
        </div>
    );
}
