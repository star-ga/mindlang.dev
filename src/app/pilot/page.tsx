import { Metadata } from "next";
import Link from "next/link";
import { Shield, Clock, FileCheck, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Pilot Program",
  description:
    "Free 4-8 week MIND Compliance Pilot Program for enterprise ML teams in healthcare, finance, and autonomous systems.",
};

const pilots = [
  {
    vertical: "Healthcare (FDA)",
    icon: Shield,
    requirements: "IEC 62304, ISO 14971, FDA 510(k)",
    deliverables: [
      "Compile-time shape verification for diagnostic models",
      "Automated FDA compliance report generation",
      "Deterministic build attestation (SLSA L3)",
      "SBOM generation (SPDX 3.0 + CycloneDX 1.5)",
    ],
  },
  {
    vertical: "Finance (SEC / SR 11-7)",
    icon: FileCheck,
    requirements: "SR 11-7, SOC 2, Model Risk Management",
    deliverables: [
      "Bit-identical reproducible builds for model validation",
      "Cryptographic provenance chain (SHA-256 at every stage)",
      "Automated audit trail with timestamp logging",
      "Dependency vulnerability scanning via OSV",
    ],
  },
  {
    vertical: "Autonomous (ISO 26262)",
    icon: Zap,
    requirements: "ISO 26262, IEC 61508, ASIL",
    deliverables: [
      "Sub-millisecond latency profiling (WCET analysis)",
      "Fixed-point arithmetic for embedded targets",
      "Safety-critical mode (NaN/overflow/bounds checking)",
      "Memory pinning for DMA transfers",
    ],
  },
];

const migrationDeliverables = [
  "Zero tensor shape bugs (compile-time verified)",
  "Deterministic audit trail for every build artifact",
  "1,300x gradient computation speedup (compiled autodiff)",
  "Single 32MB binary deployment (no Python runtime)",
];

export default function PilotPage() {
  return (
    <>
      <section className="hero !py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Free Enterprise Trial
            </div>
            <h1 className="!mb-6">MIND Compliance Pilot Program</h1>
            <p className="hero-lede">
              4-8 week free pilot for enterprise ML teams. Migrate one model,
              get full compliance artifacts, and see the difference compile-time
              guarantees make in regulated environments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=MIND%20Pilot%20Program%20Inquiry`}
                className="btn btn--primary inline-flex items-center gap-2"
              >
                Book a Demo <ArrowRight size={16} />
              </a>
              <Link href="/pricing" className="btn btn--outline">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-12">Pilot Templates by Industry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pilots.map((pilot) => (
              <div key={pilot.vertical} className="card card--outline flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <pilot.icon className="text-primary" size={24} />
                  <h3 className="text-xl font-bold">{pilot.vertical}</h3>
                </div>
                <p className="text-sm text-muted mb-4">
                  <strong>Standards:</strong> {pilot.requirements}
                </p>
                <ul className="space-y-2 flex-1">
                  {pilot.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className="text-green-600 flex-shrink-0 mt-0.5"
                        size={14}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-8">Migration Deliverables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {migrationDeliverables.map((d) => (
                <div key={d} className="flex items-start gap-3 p-4 card">
                  <CheckCircle
                    className="text-green-600 flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-8">How the Pilot Works</h2>
            <div className="space-y-6">
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
                <div key={phase.week} className="flex gap-4">
                  <div className="flex-shrink-0 w-24 text-sm font-bold text-primary">
                    {phase.week}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{phase.title}</h4>
                    <p className="text-sm text-muted">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary/5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Start?</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            No commitment, no cost. We&apos;ll migrate one model and show you
            the compliance artifacts your regulatory team needs.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=MIND%20Pilot%20Program%20Inquiry`}
            className="btn btn--primary inline-flex items-center gap-2"
          >
            Book a Demo <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
