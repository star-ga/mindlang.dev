import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Security",
    description: "MIND security model, memory safety, and deterministic execution guarantees.",
};

export default function SecurityPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/security" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/security" />
                    <h1 className="page-title mt-4">Security</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND is designed for safety-critical AI deployments. This page covers the security model, memory safety guarantees, and deterministic execution features.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Memory Safety</h2>
                        <p className="text-muted mb-4">
                            MIND inherits Rust-inspired memory safety guarantees, eliminating entire classes of vulnerabilities at compile time:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>No null pointer dereferences</strong> — optional types make nullability explicit</li>
                            <li><strong>No buffer overflows</strong> — bounds checking with compile-time shape verification</li>
                            <li><strong>No data races</strong> — ownership and borrowing rules prevent concurrent mutation</li>
                            <li><strong>No use-after-free</strong> — deterministic resource management without garbage collection</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Deterministic Execution</h2>
                        <p className="text-muted mb-4">
                            By default, MIND guarantees bit-exact reproducibility across runs:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>IEEE 754 strict compliance</strong> — floating-point operations follow the standard precisely</li>
                            <li><strong>No non-deterministic optimizations</strong> — reordering that affects results is disabled by default</li>
                            <li><strong>Explicit RNG seeding</strong> — all random operations require explicit seeds</li>
                            <li><strong>Reproducible builds</strong> — same source produces identical binaries</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Audit Trail Support</h2>
                        <p className="text-muted mb-4">
                            For regulated industries, MIND provides features to support audit and compliance:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Full execution traces available in debug mode</li>
                            <li>Immutable IR representations for model versioning</li>
                            <li>Cryptographic hashing of compiled artifacts</li>
                            <li>Integration points for external logging systems</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Threat Model</h2>
                        <p className="text-muted mb-4">
                            The MIND security model assumes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Source code and compiler are trusted</li>
                            <li>Runtime environment provides standard OS protections</li>
                            <li>Input data may be adversarial (tensor bounds are checked)</li>
                            <li>Side-channel attacks are out of scope for the base runtime</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Sandboxing (Planned)</h2>
                        <p className="text-muted mb-4">
                            Future versions will support optional sandboxing for untrusted model execution:
                        </p>
                        <CodeBlock className="mb-8">{`// Planned syntax
@sandbox(memory_limit: 1GB, time_limit: 10s)
fn untrusted_inference(input: Tensor<f32, N, M>) -> Tensor<f32, N, K> {
    // ...
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full security specification at{" "}
                            <a href="https://github.com/star-ga/mind-spec/blob/main/spec/v1.0/security.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/security.md
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Stability & Versioning", href: "/docs/stability" }}
                        next={{ label: "Performance", href: "/docs/performance" }}
                    />

                </main>
            </div>
        </div>
    );
}
