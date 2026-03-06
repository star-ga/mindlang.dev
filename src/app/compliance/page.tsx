import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  FileCheck,
  Lock,
  Hash,
  CheckCircle,
  AlertCircle,
  MinusCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance Toolkit",
  description:
    "MIND compliance toolkit: audit logs, SLSA L3 provenance, SBOM generation, deterministic builds, and regulatory checklists for FDA, EU AI Act, ISO 26262.",
};

const codeExample = `// Source: model.mind
@audit(level="full")
@provenance(slsa_level=3)
@sbom(format=["spdx-3.0", "cyclonedx-1.5"])

param weights: Tensor<f32, 784, 10>

fn forward(x: Tensor<f32, ?, 784>) -> Tensor<f32, ?, 10> {
    matmul(x, weights)  // Shape verified at compile time
}

// Build with full audit trail:
// $ mindc build model.mind --audit --provenance --sbom
//
// Generated artifacts:
//   model.bin          (compiled binary)
//   model.bin.sha256   (binary hash)
//   model.slsa.json    (SLSA v1.0 provenance)
//   model.spdx.json    (SPDX 3.0 SBOM)
//   model.cdx.json     (CycloneDX 1.5 SBOM)
//   model.audit.json   (execution audit log)`;

export default function CompliancePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">Compliance Toolkit</h1>
            <p className="hero-lede">
              Automated compliance artifacts, deterministic builds with
              cryptographic proof, and regulatory checklists mapped to your
              framework. What PyTorch, JAX, and Mojo cannot offer.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">What MIND provides</h2>

          <div className="grid grid--two lg:!grid-cols-4">
            <div className="card">
              <Hash className="card-icon" />
              <h3>Deterministic Builds</h3>
              <p>
                100% bit-identical output from identical source. SHA-256 verified
                at every stage: source, IR, binary.
              </p>
            </div>

            <div className="card">
              <Lock className="card-icon" />
              <h3>SLSA L3 Provenance</h3>
              <p>
                Ed25519-signed build attestations following SLSA v1.0. Builder
                identity, source repository, and reproducibility status.
              </p>
            </div>

            <div className="card">
              <FileCheck className="card-icon" />
              <h3>SBOM Generation</h3>
              <p>
                Automatic Software Bill of Materials in SPDX 3.0 and CycloneDX
                1.5. All transitive dependencies with license classification.
              </p>
            </div>

            <div className="card">
              <Shield className="card-icon" />
              <h3>Audit Log Exporter</h3>
              <p>
                Timestamped execution log for regulatory traceability. Every
                tensor operation, shape verification, and safety check recorded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Audit trail in action</h2>
          <div className="max-w-4xl mx-auto">
            <pre>
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Regulatory Frameworks */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Regulatory framework checklists</h2>
          <p className="section-lede">
            For each framework, we show what MIND automatically satisfies, where
            it helps, and what your team still needs to provide.
          </p>

          <div className="grid grid--three">
            {/* FDA */}
            <div className="card card--outline">
              <h3>FDA 510(k) / De Novo</h3>
              <p className="text-muted text-sm mb-4">IEC 62304, ISO 14971, ISO 13485</p>

              <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1.5">
                <CheckCircle size={14} /> Auto-satisfied
              </h4>
              <ul className="list text-sm mb-4">
                <li>Software verification (compile-time shape checks)</li>
                <li>Configuration management (SLSA L3, SHA-256)</li>
                <li>Reproducible builds (deterministic execution)</li>
              </ul>

              <h4 className="text-sm font-bold text-amber-700 mb-2 flex items-center gap-1.5">
                <AlertCircle size={14} /> MIND helps with
              </h4>
              <ul className="list text-sm mb-4">
                <li>Cybersecurity (memory safety, supply chain)</li>
                <li>Performance reporting (deterministic benchmarks)</li>
              </ul>

              <h4 className="text-sm font-bold text-muted mb-2 flex items-center gap-1.5">
                <MinusCircle size={14} /> You still need
              </h4>
              <ul className="list text-sm">
                <li>Risk management process documentation</li>
                <li>Clinical performance studies</li>
                <li>Device labeling</li>
              </ul>
            </div>

            {/* EU AI Act */}
            <div className="card card--outline">
              <h3>EU AI Act</h3>
              <p className="text-muted text-sm mb-4">Regulation 2024/1689, Articles 9-17</p>

              <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1.5">
                <CheckCircle size={14} /> Auto-satisfied
              </h4>
              <ul className="list text-sm mb-4">
                <li>Record-keeping and logging (Article 12)</li>
                <li>Build provenance and traceability</li>
              </ul>

              <h4 className="text-sm font-bold text-amber-700 mb-2 flex items-center gap-1.5">
                <AlertCircle size={14} /> MIND helps with
              </h4>
              <ul className="list text-sm mb-4">
                <li>Risk management system (Article 9)</li>
                <li>Technical documentation (Article 11)</li>
                <li>Transparency (Article 13)</li>
              </ul>

              <h4 className="text-sm font-bold text-muted mb-2 flex items-center gap-1.5">
                <MinusCircle size={14} /> You still need
              </h4>
              <ul className="list text-sm">
                <li>Data governance (Article 10)</li>
                <li>Human oversight mechanisms (Article 14)</li>
                <li>Quality management system (Article 17)</li>
              </ul>
            </div>

            {/* ISO 26262 */}
            <div className="card card--outline">
              <h3>ISO 26262</h3>
              <p className="text-muted text-sm mb-4">Parts 6, 8, 9, 11 (Functional Safety)</p>

              <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1.5">
                <CheckCircle size={14} /> Auto-satisfied
              </h4>
              <ul className="list text-sm mb-4">
                <li>Software unit design (compile-time guarantees)</li>
                <li>Software unit verification (static analysis)</li>
              </ul>

              <h4 className="text-sm font-bold text-amber-700 mb-2 flex items-center gap-1.5">
                <AlertCircle size={14} /> MIND helps with
              </h4>
              <ul className="list text-sm mb-4">
                <li>Tool qualification evidence (Part 11)</li>
                <li>Integration verification</li>
                <li>Safety-critical runtime checks</li>
              </ul>

              <h4 className="text-sm font-bold text-muted mb-2 flex items-center gap-1.5">
                <MinusCircle size={14} /> You still need
              </h4>
              <ul className="list text-sm">
                <li>ASIL classification and analysis (Part 9)</li>
                <li>Software development plan (Part 6)</li>
                <li>Hardware-software interface spec (Part 8)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-16 bg-white border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Start a compliance pilot</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Free 4-8 week pilot. Migrate one model, get full compliance
            artifacts, and see exactly what MIND automates for your regulatory
            framework.
          </p>
          <Link href="/pilot" className="btn btn--primary btn--lg">
            Learn about the pilot
          </Link>
        </div>
      </section>
    </>
  );
}
