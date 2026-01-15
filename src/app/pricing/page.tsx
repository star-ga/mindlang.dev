import { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "MIND pricing: Community (free), Pro ($99/seat), Teams ($399/month), and Enterprise (custom).",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">Pricing</h1>
            <p className="hero-lede">
              Start with the free Community Edition. Upgrade to Pro or Enterprise for commercial runtime, hosted control plane, and SLA-backed support.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Community */}
            <div className="card card--outline flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Community</h3>
                <div className="text-4xl font-bold text-primary mb-1">Free</div>
                <p className="text-sm text-muted">Forever</p>
              </div>

              <p className="text-muted mb-6 flex-1">
                The open-source compiler and language. Perfect for research, prototyping, and learning.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Apache 2.0 licensed compiler & language</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Compile-time shape checks & autodiff</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>MLIR + LLVM code generation</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Community support (Discord, GitHub)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Unlimited projects & users</span>
                </li>
              </ul>

              <Link href="/docs/quick-start" className="btn btn--primary w-full mt-auto">
                Get started
              </Link>
            </div>

            {/* Pro */}
            <div className="card card--outline flex flex-col border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                Coming Soon
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold text-primary mb-1">$99</div>
                <p className="text-sm text-muted">Per seat / month</p>
              </div>

              <p className="text-muted mb-6 flex-1">
                Hosted control plane, deterministic runtime, and basic audit logging for individuals and small teams.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span><strong>Everything in Community, plus:</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Hosted MIND Cloud control plane</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Deterministic execution mode</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Basic audit logs (30-day retention)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Email support (48-hour response)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Up to 10 users</span>
                </li>
              </ul>

              <button className="btn btn--ghost w-full mt-auto" disabled>
                Notify me
              </button>
            </div>

            {/* Teams */}
            <div className="card card--outline flex flex-col relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                Coming Soon
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Teams</h3>
                <div className="text-4xl font-bold text-primary mb-1">$399</div>
                <p className="text-sm text-muted">Per month</p>
              </div>

              <p className="text-muted mb-6 flex-1">
                Unlimited team members, extended audit logs, and priority support for growing teams.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span><strong>Everything in Pro, plus:</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Extended audit logs (90-day retention)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Priority support (24-hour response)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Team collaboration features</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Usage analytics dashboard</span>
                </li>
              </ul>

              <button className="btn btn--ghost w-full mt-auto" disabled>
                Notify me
              </button>
            </div>

            {/* Enterprise */}
            <div className="card card--outline flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-1">Custom</div>
                <p className="text-sm text-muted">Contact sales</p>
              </div>

              <p className="text-muted mb-6 flex-1">
                On-premises deployment, compliance tooling, SLA-backed support, and dedicated engineering.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span><strong>Everything in Teams, plus:</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>On-premises / VPC deployment</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Custom audit log retention</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>SOC 2, HIPAA, GDPR compliance support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>SLA-backed uptime & support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Dedicated Slack channel & TAM</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span>Custom training & onboarding</span>
                </li>
              </ul>

              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="btn btn--primary w-full mt-auto"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Pricing FAQ</h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="font-bold mb-2">Is the Community Edition really free?</h3>
              <p className="text-muted text-sm">
                Yes. The compiler and language are Apache 2.0 licensed and free to use, modify, and distribute — forever.
                You can compile and run MIND programs on your own infrastructure without any licensing fees.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">What's the difference between the tiers?</h3>
              <p className="text-muted text-sm">
                <strong>Community</strong> is the open-source compiler and language — free forever.
                <strong>Pro ($99/seat)</strong> adds the hosted control plane, deterministic execution, and basic audit logs for individuals.
                <strong>Teams ($399/month)</strong> includes unlimited members, extended logs, and priority support.
                <strong>Enterprise</strong> adds on-premises deployment, compliance support, and dedicated engineering.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Can I self-host the commercial runtime?</h3>
              <p className="text-muted text-sm">
                Yes, on the Enterprise plan. On-premises and VPC deployments of the commercial runtime and control plane are available for enterprise customers.
                This is required for air-gapped environments, HIPAA compliance, and custom network policies.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">When will Pro and Teams be available?</h3>
              <p className="text-muted text-sm">
                Pro and Teams tiers are coming in Q2 2026. Sign up for notifications on the pricing page.
                Enterprise customers can contact sales now for custom arrangements.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Do you offer academic or nonprofit pricing?</h3>
              <p className="text-muted text-sm">
                Yes. We offer discounted or free access to Pro and Enterprise features for qualifying academic institutions and nonprofits.
                Contact us at{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
                  {siteConfig.contactEmail}
                </a>{" "}
                with details about your organization.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted text-sm">
                For Pro (when available): credit card via Stripe.
                For Enterprise: invoice, wire transfer, or credit card. We support annual contracts and multi-year agreements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-16 bg-white border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Contact our team to discuss your specific needs and find the right plan for your organization.
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
