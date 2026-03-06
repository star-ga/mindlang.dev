import { Metadata } from "next";
import Link from "next/link";
import { Shield, FileCheck, Zap, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Pilot Program",
  description:
    "Free 4-8 week MIND Compliance Pilot Program for enterprise ML teams in healthcare, finance, and autonomous systems.",
};

export default function PilotPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero !py-16">
        <div className="container">
          <div className="w-full overflow-hidden rounded-xl mb-8 shadow-lg bg-gray-200">
            <img
              src="/img/features/pilot.jpg"
              alt="Pilot Program Banner"
              className="w-full block object-cover"
              style={{ height: "16vw", minHeight: "160px", maxHeight: "320px" }}
            />
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">MIND Compliance Pilot Program</h1>
            <p className="hero-lede">
              Free 4-8 week pilot for enterprise ML teams. Migrate one model,
              get full compliance artifacts, and see the difference compile-time
              guarantees make in regulated environments.
            </p>
            <div className="hero-actions">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=MIND%20Pilot%20Program%20Inquiry`}
                className="btn btn--primary btn--lg"
              >
                Book a Demo
              </a>
              <Link href="/pricing" className="btn btn--ghost btn--lg">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Templates */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Pilot templates by industry</h2>

          <div className="grid grid--three">
            <div className="card">
              <Shield className="card-icon" />
              <h3>Healthcare (FDA)</h3>
              <p className="text-muted mb-4">
                <strong>Standards:</strong> IEC 62304, ISO 14971, FDA 510(k)
              </p>
              <ul className="list text-sm">
                <li>Compile-time shape verification for diagnostic models</li>
                <li>Automated FDA compliance report generation</li>
                <li>Deterministic build attestation (SLSA L3)</li>
                <li>SBOM generation (SPDX 3.0 + CycloneDX 1.5)</li>
              </ul>
            </div>

            <div className="card">
              <FileCheck className="card-icon" />
              <h3>Finance (SEC / SR 11-7)</h3>
              <p className="text-muted mb-4">
                <strong>Standards:</strong> SR 11-7, SOC 2, Model Risk Management
              </p>
              <ul className="list text-sm">
                <li>Bit-identical reproducible builds for model validation</li>
                <li>Cryptographic provenance chain (SHA-256 at every stage)</li>
                <li>Automated audit trail with timestamp logging</li>
                <li>Dependency vulnerability scanning via OSV</li>
              </ul>
            </div>

            <div className="card">
              <Zap className="card-icon" />
              <h3>Autonomous (ISO 26262)</h3>
              <p className="text-muted mb-4">
                <strong>Standards:</strong> ISO 26262, IEC 61508, ASIL
              </p>
              <ul className="list text-sm">
                <li>Sub-millisecond latency profiling (WCET analysis)</li>
                <li>Fixed-point arithmetic for embedded targets</li>
                <li>Safety-critical mode (NaN/overflow/bounds checking)</li>
                <li>Memory pinning for DMA transfers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Deliverables */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Migration deliverables</h2>

          <div className="grid grid--two max-w-3xl mx-auto">
            {[
              "Zero tensor shape bugs (compile-time verified)",
              "Deterministic audit trail for every build artifact",
              "1,300x gradient computation speedup (compiled autodiff)",
              "Single 32MB binary deployment (no Python runtime)",
            ].map((d) => (
              <div key={d} className="card card--outline flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">How the pilot works</h2>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid--two gap-8">
              {[
                {
                  week: "Week 1-2",
                  title: "Assessment & Migration",
                  desc: "We analyze your existing model, map compliance requirements, and migrate one model from PyTorch/JAX to MIND.",
                },
                {
                  week: "Week 3-4",
                  title: "Verification & Compliance",
                  desc: "Run full compliance report generation, verify deterministic builds, and validate against your regulatory framework.",
                },
                {
                  week: "Week 5-6",
                  title: "Integration & Benchmarks",
                  desc: "Integrate with your CI/CD pipeline, benchmark performance, and generate pilot results report.",
                },
                {
                  week: "Week 7-8",
                  title: "Review & Next Steps",
                  desc: "Present findings to your team, discuss production migration path, and plan next steps.",
                },
              ].map((phase) => (
                <div key={phase.week} className="card card--outline">
                  <p className="text-sm font-bold text-primary mb-1">{phase.week}</p>
                  <h3 className="!text-lg !mb-2">{phase.title}</h3>
                  <p>{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-16 bg-white border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            No commitment, no cost. We&apos;ll migrate one model and show you
            the compliance artifacts your regulatory team needs.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=MIND%20Pilot%20Program%20Inquiry`}
            className="btn btn--primary btn--lg"
          >
            Book a Demo
          </a>
        </div>
      </section>
    </>
  );
}
