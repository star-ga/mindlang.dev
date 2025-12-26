import { Metadata } from "next";
import Link from "next/link";
import { Shield, Server, FileCheck, Headphones, Lock, Gauge } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Enterprise",
  description: "Commercial runtime, hosted control plane, audit logs, compliance tooling, and SLA-backed support for production AI systems.",
};

export default function EnterprisePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">MIND for Enterprise</h1>
            <p className="hero-lede">
              Commercial runtime, hosted control plane, and compliance tooling for production AI systems.
              Built for regulated industries where determinism, auditability, and support aren't optional.
            </p>
            <div className="mt-8">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="btn btn--primary btn--lg"
              >
                Request a demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Runtime Value */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">What you get</h2>

          <div className="grid grid--three">
            <div className="card">
              <FileCheck className="card-icon" />
              <h3>Deterministic execution mode</h3>
              <p>
                Reproducible training runs and inference within a defined environment.
                Bit-identical outputs for model versioning, A/B testing, and compliance audits.
              </p>
            </div>

            <div className="card">
              <Shield className="card-icon" />
              <h3>Audit logs & compliance posture</h3>
              <p>
                Cryptographic build provenance, execution traces, and dependency manifests.
                Designed for SOC 2, HIPAA, and other regulatory frameworks requiring ML auditability.
              </p>
            </div>

            <div className="card">
              <Server className="card-icon" />
              <h3>Hosted control plane</h3>
              <p>
                Managed compilation, deployment orchestration, and observability dashboards.
                Deploy to cloud, on-prem, or edge targets from a single control surface.
              </p>
            </div>

            <div className="card">
              <Headphones className="card-icon" />
              <h3>SLA-backed support</h3>
              <p>
                Dedicated support channels, guaranteed response times, and direct access to MIND engineering.
                Production incident support and architectural guidance.
              </p>
            </div>

            <div className="card">
              <Lock className="card-icon" />
              <h3>Private deployments</h3>
              <p>
                On-premises or VPC deployment of the commercial runtime and control plane.
                Full air-gapped support for sensitive workloads.
              </p>
            </div>

            <div className="card">
              <Gauge className="card-icon" />
              <h3>Performance SLAs</h3>
              <p>
                Committed uptime, compilation latency targets, and throughput guarantees.
                Validated on your hardware and workload profiles.
              </p>
            </div>

            <div className="card">
              <Server className="card-icon" />
              <h3>Production GPU Runtime</h3>
              <p>
                CUDA 12.8+ backend with cuBLAS/cuDNN, TF32/FP16/FP8 Tensor Cores.
                180x faster memory allocation than PyTorch. Supports NVIDIA Ampere, 
                Ada Lovelace, and Hopper GPUs. ROCm and Metal planned for 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4">
              <h2 className="section-title text-left !mb-0">Deployment options</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="section-lede text-left !mx-0 !max-w-none">
                The commercial runtime supports flexible deployment models — hosted SaaS, on-premises, or hybrid infrastructure.
              </p>
            </div>
          </div>

          <div className="grid grid--three">
            <div className="card card--outline">
              <h3>MIND Cloud (SaaS)</h3>
              <p className="flex-1">
                Fully managed control plane hosted by {siteConfig.company}.
                Zero infrastructure overhead — compile, deploy, and monitor models from your browser.
              </p>
              <ul className="list text-sm mt-4">
                <li>Multi-region availability</li>
                <li>SOC 2 Type II (audit in progress)</li>
                <li>Automatic updates and patching</li>
              </ul>
            </div>

            <div className="card card--outline">
              <h3>On-Premises</h3>
              <p className="flex-1">
                Deploy the commercial runtime and control plane in your own data center or VPC.
                Full control over data residency and network policies.
              </p>
              <ul className="list text-sm mt-4">
                <li>Air-gapped deployment support</li>
                <li>Custom compliance integrations</li>
                <li>Dedicated instance sizing</li>
              </ul>
            </div>

            <div className="card card--outline">
              <h3>Hybrid</h3>
              <p className="flex-1">
                Control plane in MIND Cloud, runtime execution in your infrastructure.
                Centralized management with on-prem workload execution.
              </p>
              <ul className="list text-sm mt-4">
                <li>Cross-region orchestration</li>
                <li>Edge + cloud deployment</li>
                <li>Unified observability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Enterprise use cases</h2>

          <div className="grid grid--two gap-8">
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Healthcare & life sciences</h3>
              <p className="text-muted mb-4">
                HIPAA-compliant ML pipelines for diagnostic models, clinical decision support, and drug discovery.
                Deterministic builds enable model validation and regulatory submissions.
              </p>
              <ul className="list text-sm">
                <li>Reproducible clinical trial simulations</li>
                <li>Audit trails for FDA/EMA compliance</li>
                <li>De-identified data processing in secure enclaves</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Financial services</h3>
              <p className="text-muted mb-4">
                Risk modeling, fraud detection, and algorithmic trading with full auditability.
                Compliance with SR 11-7, MiFID II, and other regulatory requirements.
              </p>
              <ul className="list text-sm">
                <li>Model risk management (MRM) documentation</li>
                <li>Backtesting with deterministic execution</li>
                <li>Explainable AI for credit decisioning</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Autonomous systems</h3>
              <p className="text-muted mb-4">
                Perception, planning, and control for robotics, vehicles, and drones.
                Lean binaries for edge deployment with safety-critical guarantees.
              </p>
              <ul className="list text-sm">
                <li>ISO 26262 / DO-178C alignment</li>
                <li>Bit-identical simulation and deployment</li>
                <li>Real-time inference on embedded hardware</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">Platform & infrastructure teams</h3>
              <p className="text-muted mb-4">
                Standardize ML tooling across research and production.
                Reduce operational complexity and eliminate framework sprawl.
              </p>
              <ul className="list text-sm">
                <li>Unified language from notebook to deployment</li>
                <li>Centralized observability and cost tracking</li>
                <li>Self-service model deployment for data scientists</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Adoption Flow */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Enterprise adoption flow</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Start with the open-source Community Edition, then upgrade to commercial runtime and hosted offerings as your needs scale.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted text-center mb-8">
              For a detailed breakdown of the adoption journey, see the{" "}
              <Link href="/enterprise-flow" className="text-primary hover:underline">
                Enterprise Adoption Flow
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-16 bg-white border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to talk?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Schedule a demo to see how MIND's commercial runtime and hosted control plane fit your infrastructure and compliance requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="btn btn--primary btn--lg"
            >
              Contact sales
            </a>
            <Link href="/docs/quick-start" className="btn btn--ghost btn--lg">
              Start with Community Edition
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
