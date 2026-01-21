import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Package Management",
    description: "MIND package management with dependency resolution, security audit, SBOM generation, and supply chain security.",
};

export default function PackagePage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/package" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/package" />
                    <h1 className="page-title mt-4">Package Management</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND provides enterprise-grade package management with modern dependency resolution, supply chain security, and compliance features.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Architecture</h2>
                        <CodeBlock className="mb-4">{`┌─────────────────────────────────────────────────┐
│              Package Manager CLI                │
├─────────────────────────────────────────────────┤
│  Manifest Parser  │  Lockfile Manager           │
├───────────────────┼─────────────────────────────┤
│  PubGrub Resolver │  Content-Addressed Storage  │
├───────────────────┼─────────────────────────────┤
│  Sparse Registry  │  Workspace Manager          │
├─────────────────────────────────────────────────┤
│        Security: Audit | SBOM | Provenance      │
└─────────────────────────────────────────────────┘`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Core Features</h2>

                        <h3 className="text-xl font-bold mt-8 mb-4">PubGrub CDCL Resolver</h3>
                        <p className="text-muted mb-4">
                            Modern satisfiability-based dependency resolution using the PubGrub algorithm (same as Cargo and pub). Features:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Conflict-Driven Clause Learning</strong>: Efficient backtracking on version conflicts</li>
                            <li><strong>Multi-Version Isolation</strong>: Support for diamond dependencies with version isolation</li>
                            <li><strong>Resolution Strategies</strong>: Minimal, maximal, or hybrid version selection</li>
                        </ul>

                        <h3 className="text-xl font-bold mt-8 mb-4">Content-Addressed Storage</h3>
                        <p className="text-muted mb-4">
                            All packages are stored by SHA-256 content hash, enabling:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Deduplication</strong>: Identical packages stored once regardless of version</li>
                            <li><strong>Integrity Verification</strong>: Automatic hash checking on install</li>
                            <li><strong>Reproducible Builds</strong>: Same lockfile always produces same install</li>
                        </ul>

                        <h3 className="text-xl font-bold mt-8 mb-4">Lockfile Integrity</h3>
                        <CodeBlock className="mb-8">{`# mind.lock
[metadata]
version = "1"
generated = "2026-01-20T21:45:00Z"

[[package]]
name = "tensor-utils"
version = "2.1.0"
source = "registry+https://packages.mindlang.dev"
integrity = "sha256-a1b2c3d4e5f6..."
dependencies = ["core@1.0", "math@2.0"]`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Security & Compliance</h2>

                        <h3 className="text-xl font-bold mt-8 mb-4">Security Audit (OSV)</h3>
                        <p className="text-muted mb-4">
                            Integrated vulnerability scanning using the Open Source Vulnerabilities database:
                        </p>
                        <CodeBlock className="mb-8">{`use mind_runtime::package::{SecurityAuditor, AuditConfig};

let auditor = SecurityAuditor::new(AuditConfig::default());
let report = auditor.audit(&lockfile.packages)?;

for advisory in report.advisories {
    println!("{}: {} ({})",
        advisory.id,
        advisory.summary,
        advisory.severity
    );
}`}</CodeBlock>

                        <h3 className="text-xl font-bold mt-8 mb-4">SLSA Provenance</h3>
                        <p className="text-muted mb-4">
                            Supply chain attestations with Ed25519 cryptographic signatures following SLSA framework:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Level 1-3 Support</strong>: Configurable provenance levels</li>
                            <li><strong>Ed25519 Signing</strong>: Fast, secure digital signatures</li>
                            <li><strong>In-toto Format</strong>: Industry-standard attestation schema</li>
                            <li><strong>Sigstore Compatible</strong>: Optional transparency log integration</li>
                        </ul>

                        <h3 className="text-xl font-bold mt-8 mb-4">SBOM Generation</h3>
                        <p className="text-muted mb-4">
                            Software Bill of Materials in industry-standard formats:
                        </p>
                        <CodeBlock className="mb-8">{`use mind_runtime::package::{SbomGenerator, SbomConfig, SbomFormat};

let generator = SbomGenerator::new(SbomConfig {
    format: SbomFormat::CycloneDx,  // or SbomFormat::Spdx
    include_dev_deps: false,
    ..Default::default()
});

let sbom = generator.generate(&lockfile)?;
sbom.save("sbom.json")?;`}</CodeBlock>
                        <p className="text-sm text-muted mb-8">
                            Supports <strong>SPDX 3.0</strong> and <strong>CycloneDX 1.5</strong> formats for regulatory compliance.
                        </p>

                        <h3 className="text-xl font-bold mt-8 mb-4">Policy Enforcement</h3>
                        <p className="text-muted mb-4">
                            Configurable security gates with three policy levels:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Level</th>
                                        <th className="text-left py-2 pr-4 font-bold">Vulnerabilities</th>
                                        <th className="text-left py-2 font-bold">Licenses</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Permissive</td>
                                        <td className="py-2 pr-4">Warn on critical</td>
                                        <td className="py-2">Allow all</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Standard</td>
                                        <td className="py-2 pr-4">Block critical/high</td>
                                        <td className="py-2">Deny AGPL, GPL</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Strict</td>
                                        <td className="py-2 pr-4">Block all known CVEs</td>
                                        <td className="py-2">Allow-list only</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Workspace Support</h2>
                        <p className="text-muted mb-4">
                            Monorepo management with shared dependencies and workspace inheritance:
                        </p>
                        <CodeBlock className="mb-8">{`# mind.toml (workspace root)
[workspace]
members = ["packages/*", "apps/*"]

[workspace.dependencies]
core = "1.0"
tensor = { version = "2.0", features = ["gpu"] }

# packages/my-lib/mind.toml
[package]
name = "my-lib"

[dependencies]
core.workspace = true  # inherits from workspace`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Sparse Registry Protocol</h2>
                        <p className="text-muted mb-4">
                            HTTP-based package index with efficient caching:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Async HTTP</strong>: Non-blocking fetches with reqwest</li>
                            <li><strong>ETag/If-Modified-Since</strong>: Conditional requests for bandwidth efficiency</li>
                            <li><strong>Local Cache</strong>: Configurable TTL for offline support</li>
                            <li><strong>Auth Support</strong>: Bearer token authentication for private registries</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the{" "}
                            <a href="https://github.com/star-ga/mind-spec/blob/main/spec/v1.0/package.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                Package Management Specification
                            </a>{" "}
                            for the full technical details, and the{" "}
                            <Link href="/roadmap" className="text-primary hover:underline">
                                Roadmap
                            </Link>{" "}
                            for the feature status. Enterprise customers can access the runtime implementation via{" "}
                            <Link href="/enterprise" className="text-primary hover:underline">
                                Enterprise license
                            </Link>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Deployment", href: "/docs/deployment" }}
                        next={{ label: "Conformance", href: "/docs/conformance" }}
                    />

                </main>
            </div>
        </div>
    );
}
