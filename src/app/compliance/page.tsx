import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  FileCheck,
  Lock,
  Hash,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  MinusCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance Toolkit",
  description:
    "MIND compliance toolkit: audit logs, SLSA L3 provenance, SBOM generation, deterministic builds, and regulatory checklists for FDA, EU AI Act, ISO 26262.",
};

const capabilities = [
  {
    icon: Hash,
    title: "Deterministic Builds",
    desc: "100% bit-identical output from identical source. SHA-256 verified at every stage: source, IR, binary. Cryptographic proof of reproducibility.",
  },
  {
    icon: Lock,
    title: "SLSA L3 Provenance",
    desc: "Ed25519-signed build attestations following SLSA v1.0. Builder identity, source repository, build configuration, and reproducibility status.",
  },
  {
    icon: FileCheck,
    title: "SBOM Generation",
    desc: "Automatic Software Bill of Materials in SPDX 3.0 and CycloneDX 1.5 formats. All transitive dependencies with license classification.",
  },
  {
    icon: Shield,
    title: "Audit Log Exporter",
    desc: "Timestamped operation-level execution log for regulatory traceability. Every tensor operation, shape verification, and safety check recorded.",
  },
];

const frameworks = [
  {
    name: "FDA 510(k) / De Novo",
    standards: "IEC 62304, ISO 14971, ISO 13485",
    autoItems: [
      "Software verification (compile-time shape checks)",
      "Configuration management (SLSA L3, SHA-256)",
      "Reproducible builds (deterministic execution)",
    ],
    manualItems: [
      "Risk management process documentation",
      "Clinical performance studies",
      "Predetermined change control plan",
      "Device labeling",
    ],
    helpItems: [
      "Cybersecurity (memory safety, supply chain)",
      "Performance reporting (deterministic benchmarks)",
      "Software development lifecycle support",
    ],
  },
  {
    name: "EU AI Act",
    standards: "Regulation 2024/1689, Articles 9-17",
    autoItems: [
      "Record-keeping and logging (Article 12)",
      "Build provenance and traceability",
    ],
    manualItems: [
      "Data governance (Article 10)",
      "Human oversight mechanisms (Article 14)",
      "Quality management system (Article 17)",
    ],
    helpItems: [
      "Risk management system (Article 9)",
      "Technical documentation (Article 11)",
      "Transparency (Article 13)",
      "Accuracy and robustness (Article 15)",
    ],
  },
  {
    name: "ISO 26262",
    standards: "Parts 6, 8, 9, 11 (Functional Safety)",
    autoItems: [
      "Software unit design (compile-time guarantees)",
      "Software unit verification (static analysis)",
    ],
    manualItems: [
      "ASIL classification and analysis (Part 9)",
      "Software development plan (Part 6)",
      "Hardware-software interface spec (Part 8)",
    ],
    helpItems: [
      "Tool qualification evidence (Part 11)",
      "Integration verification",
      "Safety-critical runtime checks",
    ],
  },
];

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
      <section className="hero !py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">Compliance Toolkit</h1>
            <p className="hero-lede">
              What PyTorch, JAX, and Mojo literally cannot offer: automated
              compliance artifacts, deterministic builds with cryptographic
              proof, and regulatory checklists mapped to your framework.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {capabilities.map((cap) => (
              <div key={cap.title} className="card card--outline">
                <cap.icon className="text-primary mb-4" size={28} />
                <h3 className="text-lg font-bold mb-2">{cap.title}</h3>
                <p className="text-sm text-muted">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">Audit Trail in Action</h2>
            <pre className="bg-[var(--bg-code)] text-[var(--text-code)] p-6 rounded-lg overflow-x-auto text-sm leading-relaxed">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">Regulatory Framework Checklists</h2>
          <div className="space-y-12 max-w-5xl mx-auto">
            {frameworks.map((fw) => (
              <div key={fw.name} className="card card--outline p-8">
                <h3 className="text-2xl font-bold mb-1">{fw.name}</h3>
                <p className="text-sm text-muted mb-6">{fw.standards}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <CheckCircle size={16} /> MIND Auto-Satisfies
                    </h4>
                    <ul className="space-y-2">
                      {fw.autoItems.map((item) => (
                        <li key={item} className="text-sm flex items-start gap-2">
                          <CheckCircle
                            className="text-green-600 flex-shrink-0 mt-0.5"
                            size={12}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                      <AlertCircle size={16} /> MIND Helps With
                    </h4>
                    <ul className="space-y-2">
                      {fw.helpItems.map((item) => (
                        <li key={item} className="text-sm flex items-start gap-2">
                          <AlertCircle
                            className="text-amber-600 flex-shrink-0 mt-0.5"
                            size={12}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-muted mb-3 flex items-center gap-2">
                      <MinusCircle size={16} /> You Still Need
                    </h4>
                    <ul className="space-y-2">
                      {fw.manualItems.map((item) => (
                        <li key={item} className="text-sm flex items-start gap-2">
                          <MinusCircle
                            className="text-muted flex-shrink-0 mt-0.5"
                            size={12}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary/5">
        <div className="container text-center">
          <h2 className="mb-4">Start a Compliance Pilot</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Free 4-8 week pilot. Migrate one model, get full compliance
            artifacts, and see exactly what MIND automates for your regulatory
            framework.
          </p>
          <Link
            href="/pilot"
            className="btn btn--primary inline-flex items-center gap-2"
          >
            Learn About the Pilot <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
