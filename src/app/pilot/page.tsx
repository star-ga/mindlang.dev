import { Metadata } from "next";
import Link from "next/link";
import { Shield, FileCheck, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Pilot Program",
  description:
    "Free 4-8 week MIND Compliance Pilot Program for enterprise ML teams in healthcare, finance, and autonomous systems.",
};

const deliverables = [
  {
    text: "Zero tensor shape bugs",
    detail: "Compile-time verified — impossible to ship shape mismatches",
  },
  {
    text: "Deterministic audit trail",
    detail: "SHA-256 provenance for every build artifact, source to binary",
  },
  {
    text: "1,300× gradient computation speedup",
    detail: "Compiled autodiff vs interpreted — verified on Criterion.rs benchmarks",
  },
  {
    text: "Single 32 MB binary deployment",
    detail: "No Python runtime, no pip, no Docker layers — one static binary",
  },
];

const phases = [
  {
    week: "Week 1–2",
    title: "Assessment & Migration",
    desc: "We analyze your existing model, map compliance requirements, and migrate one model from PyTorch/JAX to MIND.",
    color: "bg-cyan-500",
  },
  {
    week: "Week 3–4",
    title: "Verification & Compliance",
    desc: "Run full compliance report generation, verify deterministic builds, and validate against your regulatory framework.",
    color: "bg-primary",
  },
  {
    week: "Week 5–6",
    title: "Integration & Benchmarks",
    desc: "Integrate with your CI/CD pipeline, benchmark performance against your baseline, and generate the pilot results report.",
    color: "bg-emerald-500",
  },
  {
    week: "Week 7–8",
    title: "Review & Next Steps",
    desc: "Present findings to your team, discuss production migration path, and plan next steps with a dedicated MIND engineer.",
    color: "bg-violet-500",
  },
];

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
            <p className="eyebrow">Free &middot; 4-8 weeks &middot; Zero commitment</p>
            <h1 className="!mb-6">MIND Compliance Pilot Program</h1>
            <p className="hero-lede">
              Migrate one model from PyTorch or JAX to MIND. Get full compliance
              artifacts, deterministic builds, and compile-time safety guarantees
              &mdash; in weeks, not quarters.
            </p>
            <div className="hero-actions mt-8">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=MIND%20Pilot%20Program%20Inquiry`}
                className="btn btn--primary btn--lg"
              >
                Apply for Pilot
              </a>
              <Link href="/pricing" className="btn btn--ghost btn--lg">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Deliverables */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">What you get</h2>
            <p className="text-muted text-center mb-10 max-w-2xl mx-auto">
              Every pilot produces concrete, measurable artifacts your engineering and compliance teams can evaluate immediately.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {deliverables.map((d) => (
                <div
                  key={d.text}
                  className="card card--outline p-5 flex items-start gap-4 hover:border-primary/40 transition-colors"
                >
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={22} />
                  <div>
                    <p className="font-bold text-foreground mb-1">{d.text}</p>
                    <p className="text-sm text-muted leading-relaxed m-0">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--alt">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title">How the pilot works</h2>
            <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
              A structured 8-week engagement with a dedicated MIND engineer. No lock-in &mdash; evaluate on your terms.
            </p>

            <div className="relative">
              {/* Vertical timeline line */}
              <div className="hidden md:block absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-300 via-primary to-violet-400" />

              <div className="space-y-8">
                {phases.map((phase, i) => (
                  <div key={phase.week} className="flex gap-6 items-start">
                    {/* Timeline dot */}
                    <div className="hidden md:flex flex-col items-center shrink-0">
                      <div className={`w-5 h-5 rounded-full ${phase.color} ring-4 ring-white shadow-md z-10`} />
                    </div>

                    {/* Card */}
                    <div className="card card--outline flex-1 p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-md text-white ${phase.color}`}>
                          {phase.week}
                        </span>
                        <h3 className="text-lg font-bold text-foreground m-0">
                          {phase.title}
                        </h3>
                      </div>
                      <p className="text-muted leading-relaxed m-0">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Templates */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Pilot templates by industry</h2>
          <p className="text-muted text-center mb-10 max-w-2xl mx-auto">
            Pre-built compliance mappings for regulated industries. Your pilot starts with the right framework from day one.
          </p>

          <div className="grid grid--three">
            <div className="card hover:shadow-md transition-shadow">
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

            <div className="card hover:shadow-md transition-shadow">
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

            <div className="card hover:shadow-md transition-shadow">
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

      {/* CTA */}
      <section className="section py-16 border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            No commitment, no cost. We&apos;ll migrate one model and deliver
            the compliance artifacts your regulatory team needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=MIND%20Pilot%20Program%20Inquiry`}
              className="btn btn--primary btn--lg"
            >
              Apply for Pilot
            </a>
            <Link href="/bench" className="btn btn--ghost btn--lg">
              See benchmarks <ArrowRight size={16} className="ml-1 inline" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
