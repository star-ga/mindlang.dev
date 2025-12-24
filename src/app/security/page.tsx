import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, FileCheck, Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description: "Security posture, compliance framework alignment, and auditability features for MIND's compiler and commercial runtime.",
};

export default function SecurityPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">Security & Compliance</h1>
            <p className="hero-lede">
              MIND is designed for industries where security, auditability, and compliance are non-negotiable.
              Deterministic builds, cryptographic provenance, and SOC 2-aligned controls.
            </p>
          </div>
        </div>
      </section>

      {/* Security Posture */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Security posture</h2>

          <div className="grid grid--three">
            <div className="card">
              <Shield className="card-icon" />
              <h3>Deterministic builds</h3>
              <p>
                Every compilation produces bit-identical output given the same inputs.
                Enables cryptographic verification of build artifacts and supply chain integrity.
              </p>
            </div>

            <div className="card">
              <FileCheck className="card-icon" />
              <h3>Cryptographic provenance</h3>
              <p>
                Build manifests include SHA256 hashes of source code, dependencies, and compiler version.
                Full chain-of-custody for model artifacts.
              </p>
            </div>

            <div className="card">
              <Lock className="card-icon" />
              <h3>Memory safety</h3>
              <p>
                Rust-inspired ownership model prevents buffer overflows, use-after-free, and data races.
                No unsafe pointer arithmetic in user code.
              </p>
            </div>

            <div className="card">
              <Eye className="card-icon" />
              <h3>Audit logging</h3>
              <p className="mb-4">
                Commercial runtime includes structured audit logs for compilation events, deployments, and inference calls.
              </p>
              <div className="text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1 inline-block">
                Commercial feature
              </div>
            </div>

            <div className="card">
              <AlertTriangle className="card-icon" />
              <h3>Vulnerability disclosure</h3>
              <p>
                Coordinated disclosure process for security issues.
                CVE assignment and patch releases following best practices.
              </p>
            </div>

            <div className="card">
              <CheckCircle className="card-icon" />
              <h3>Dependency scanning</h3>
              <p className="mb-4">
                Automated scanning of compiler dependencies for known vulnerabilities.
                SBOM (Software Bill of Materials) generation for compliance reporting.
              </p>
              <div className="text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1 inline-block">
                Planned
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Alignment */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4">
              <h2 className="section-title text-left !mb-0">Compliance framework alignment</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="section-lede text-left !mx-0 !max-w-none">
                MIND's deterministic execution and audit logging are designed to support compliance with regulatory frameworks for ML systems.
              </p>
            </div>
          </div>

          <div className="grid grid--two gap-8">
            <div className="card card--outline">
              <h3>SOC 2 Type II</h3>
              <p className="text-muted mb-4">
                MIND Cloud (hosted control plane) is undergoing SOC 2 Type II audit.
                Security, availability, and confidentiality controls aligned with AICPA standards.
              </p>
              <div className="text-xs bg-amber-50 border border-amber-200 rounded px-3 py-2">
                <strong>Status:</strong> Audit in progress (expected Q2 2025)
              </div>
            </div>

            <div className="card card--outline">
              <h3>HIPAA</h3>
              <p className="text-muted mb-4">
                On-premises and VPC deployments support HIPAA-compliant ML pipelines.
                Business Associate Agreement (BAA) available for covered entities.
              </p>
              <div className="text-xs bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
                <strong>Status:</strong> Available for enterprise customers
              </div>
            </div>

            <div className="card card--outline">
              <h3>ISO/IEC 27001</h3>
              <p className="text-muted mb-4">
                Information security management system (ISMS) aligned with ISO 27001 controls.
                Certification planned for hosted offerings.
              </p>
              <div className="text-xs bg-amber-50 border border-amber-200 rounded px-3 py-2">
                <strong>Status:</strong> Planned (2025)
              </div>
            </div>

            <div className="card card--outline">
              <h3>GDPR & Data Privacy</h3>
              <p className="text-muted mb-4">
                Data Processing Agreement (DPA) available for EU customers.
                Support for data residency requirements and right-to-deletion workflows.
              </p>
              <div className="text-xs bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
                <strong>Status:</strong> Available for enterprise customers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auditability Features */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Auditability features</h2>

          <div className="grid grid--two gap-8">
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Build reproducibility</h3>
              <p className="text-muted mb-4">
                Deterministic compilation ensures that the same source code, compiler version, and dependencies always produce identical binaries.
                Critical for validating model artifacts in regulated environments.
              </p>
              <ul className="list text-sm">
                <li>SHA256 hashing of build outputs</li>
                <li>Lockfile-based dependency pinning</li>
                <li>Compiler version manifests</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Execution traces</h3>
              <p className="text-muted mb-4">
                Commercial runtime captures structured logs of model execution: inputs, outputs, timestamps, and resource usage.
                Enables compliance audits and incident investigation.
              </p>
              <ul className="list text-sm">
                <li>Request-level tracing with correlation IDs</li>
                <li>Tamper-evident log storage</li>
                <li>Export to SIEM systems (Splunk, Datadog, etc.)</li>
              </ul>
              <div className="text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1 inline-block mt-3">
                Commercial feature
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Model versioning & lineage</h3>
              <p className="text-muted mb-4">
                Track model lineage from training data to deployed artifacts.
                Full provenance graph for A/B testing, rollback, and regulatory submissions.
              </p>
              <ul className="list text-sm">
                <li>Git-based source versioning</li>
                <li>Immutable artifact registry</li>
                <li>Training run metadata (dataset hashes, hyperparameters)</li>
              </ul>
              <div className="text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1 inline-block mt-3">
                Commercial feature
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Compliance reporting</h3>
              <p className="text-muted mb-4">
                Automated generation of compliance artifacts: SBOMs, vulnerability reports, and access logs.
                Integration with governance, risk, and compliance (GRC) platforms.
              </p>
              <ul className="list text-sm">
                <li>CycloneDX SBOM export</li>
                <li>CVE tracking and remediation workflows</li>
                <li>Audit-ready report templates</li>
              </ul>
              <div className="text-xs bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block mt-3">
                Planned
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-left">Security vulnerability disclosure</h2>
            <p className="text-muted mb-6">
              We take security seriously. If you discover a security vulnerability in MIND, please report it responsibly.
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-3">How to report</h3>
              <p className="text-muted text-sm mb-4">
                Email security reports to{" "}
                <a href={`mailto:${siteConfig.securityEmail}`} className="text-primary hover:underline">
                  {siteConfig.securityEmail}
                </a>
                . Please include:
              </p>
              <ul className="list text-sm mb-4">
                <li>Description of the vulnerability</li>
                <li>Steps to reproduce</li>
                <li>Affected versions (if known)</li>
                <li>Your contact information for follow-up</li>
              </ul>
              <p className="text-muted text-sm">
                We aim to acknowledge reports within 48 hours and provide a timeline for remediation.
                Coordinated disclosure: we ask that you do not publicly disclose until we have issued a patch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Link */}
      <section className="section section--alt">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Technical security documentation</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            For technical details on MIND's security architecture, see the full documentation.
          </p>
          <Link href="/docs/security" className="btn btn--primary">
            View security docs
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-16 bg-white border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Questions about security or compliance?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Contact our team to discuss your specific security and compliance requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="btn btn--primary btn--lg"
            >
              Contact us
            </a>
            <Link href="/enterprise" className="btn btn--ghost btn--lg">
              Learn about enterprise
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
