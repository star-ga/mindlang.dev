import { Metadata } from "next";
import Link from "next/link";
import { Check, X, Minus } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Compare MIND",
  description: "How MIND compares to PyTorch, JAX, Mojo, and Swift for TensorFlow — typing, shape checks, autodiff, determinism, and deployment models.",
};

export default function ComparePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">How MIND compares</h1>
            <p className="hero-lede">
              MIND brings compile-time guarantees, deterministic execution, and unified tooling to AI development.
              Here's how it compares to other frameworks and languages.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section">
        <div className="container">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="text-left py-4 pr-6 font-bold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-foreground bg-primary/5">MIND</th>
                  <th className="text-center py-4 px-4 font-bold text-muted">PyTorch</th>
                  <th className="text-center py-4 px-4 font-bold text-muted">JAX</th>
                  <th className="text-center py-4 px-4 font-bold text-muted">Mojo</th>
                  <th className="text-center py-4 px-4 font-bold text-muted">Swift for TF</th>
                </tr>
              </thead>
              <tbody>
                {/* Static Typing */}
                <tr className="border-b border-card-border">
                  <td className="py-4 pr-6 font-medium">Static typing</td>
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <Check className="inline text-green-600" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Optional (via mypy)</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Optional (via mypy)</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="inline text-green-600" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Check className="inline text-green-600" size={20} />
                  </td>
                </tr>

                {/* Compile-time shape checks */}
                <tr className="border-b border-card-border">
                  <td className="py-4 pr-6 font-medium">Compile-time shape checks</td>
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <Check className="inline text-green-600" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="inline text-red-400" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Partial (via jaxtyping)</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Planned</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Partial</div>
                  </td>
                </tr>

                {/* Autodiff mechanism */}
                <tr className="border-b border-card-border">
                  <td className="py-4 pr-6 font-medium">Autodiff mechanism</td>
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <div className="text-xs font-semibold text-primary">Compile-time</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Runtime tape</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">JIT transforms</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Not built-in</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Deprecated</div>
                  </td>
                </tr>

                {/* Deterministic builds */}
                <tr className="border-b border-card-border">
                  <td className="py-4 pr-6 font-medium">Deterministic builds</td>
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <div className="text-xs font-semibold text-primary">Within defined env</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="inline text-red-400" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Mostly</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Minus className="inline text-muted" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Minus className="inline text-muted" size={20} />
                  </td>
                </tr>

                {/* Deployment model */}
                <tr className="border-b border-card-border">
                  <td className="py-4 pr-6 font-medium">Deployment model</td>
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <div className="text-xs font-semibold">AOT compilation</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Interpreter + JIT</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">JIT compilation</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">AOT compilation</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">AOT compilation</div>
                  </td>
                </tr>

                {/* Auditability & compliance */}
                <tr className="border-b border-card-border">
                  <td className="py-4 pr-6 font-medium">Auditability & compliance tooling</td>
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <Check className="inline text-green-600" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="inline text-red-400" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="inline text-red-400" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="inline text-red-400" size={20} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <X className="inline text-red-400" size={20} />
                  </td>
                </tr>

                {/* Production status */}
                <tr className="border-b border-card-border">
                  <td className="py-4 pr-6 font-medium">Production status</td>
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <div className="text-xs font-semibold">Early access</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Mature</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Mature</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Early access</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="text-xs text-muted">Archived</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted mt-8 text-center max-w-2xl mx-auto">
            This comparison reflects publicly available information at the time of writing.
            Frameworks evolve rapidly — consult official documentation for the latest capabilities.
          </p>
        </div>
      </section>

      {/* Key Differences */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Key differences</h2>

          <div className="grid grid--two gap-8">
            <div className="card">
              <h3 className="text-lg font-bold mb-3">MIND vs PyTorch / JAX</h3>
              <p className="text-muted mb-4">
                PyTorch and JAX are excellent for research and production ML, but they operate in interpreted Python with runtime type checking.
                MIND brings compile-time guarantees (shape checks, type safety) and deterministic builds — critical for regulated industries and edge deployment.
              </p>
              <ul className="list text-sm">
                <li>Catch shape bugs at compile time, not in production</li>
                <li>Eliminate per-iteration autodiff overhead</li>
                <li>Bit-identical builds for audit trails</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">MIND vs Mojo</h3>
              <p className="text-muted mb-4">
                Mojo focuses on Python compatibility and systems programming for AI.
                MIND is purpose-built for tensor operations with first-class autodiff, compile-time shape checks, and deterministic execution — a narrower focus on ML compiler guarantees.
              </p>
              <ul className="list text-sm">
                <li>Tensor-native type system (not general-purpose)</li>
                <li>Built-in compile-time autodiff</li>
                <li>Microsecond-scale compilation times</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to try MIND?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Start with the quick-start guide or request an enterprise demo to see how MIND fits your infrastructure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/docs/quick-start" className="btn btn--primary btn--lg">
              Start in 5 minutes
            </Link>
            <Link href="/enterprise" className="btn btn--ghost btn--lg">
              Request enterprise demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
