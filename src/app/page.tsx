import { Metadata } from "next";
import Link from "next/link";
import { Terminal, Grid3X3, Zap, Server, Code, Cpu, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { siteConfig } from "@/data/site";
import { CodeWindow } from "@/components/ui/CodeWindow";

export const metadata: Metadata = {
  title: {
    absolute: "MIND - Intelligence, Compiled",
  },
  description: "MIND is a programming language and compiler stack built for AI and numerical computing — tensor-native types, static shape checks, automatic differentiation, and MLIR-powered code generation.",
};

const exampleCode = `fn main() {
  // 2x2 input tensor
  let x: Tensor<f32, 2, 2> = [[1.0, 2.0], [3.0, 4.0]];

  // Parameter tensor with compile-time shape
  let w: Tensor<f32, 2, 2> = randn();

  // Autodiff-ready computation
  let y = relu(x @ w);

  print(y);
}`;

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/mind-logo-full.svg"
                alt="MIND Logo"
                className="h-72 w-auto mx-auto"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <p className="eyebrow">MACHINE INTELLIGENCE NATIVE DESIGN</p>
            <h1>
              Intelligence, <span className="accent">compiled.</span>
            </h1>
            <p className="hero-lede text-left">
              <strong>One language from prototype to production AI.</strong>{" "}
              MIND brings compile-time tensor safety, compile-time autodiff, and deterministic execution to AI development —
              catching shape bugs before runtime, eliminating training overhead, and delivering auditable builds for regulated industries.
            </p>

            <div className="hero-actions">
              <Link href="/docs/quick-start" className="btn btn--primary btn--lg">
                Start in 5 minutes
              </Link>
              <Link href="/enterprise" className="btn btn--ghost btn--lg">
                Request enterprise demo
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--lg"
              >
                Browse the source
              </a>
            </div>

            <p className="hero-meta">
              Apache 2.0 open core · MLIR + LLVM · deterministic-by-design · commercial runtime & hosted control plane
            </p>
          </div>

          {/* Code Example */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="badge">MIND example</span>
              <span className="text-muted font-medium">Tensor-native main</span>
            </div>
            <CodeWindow
              code={exampleCode}
              language="rust"
              title="example.mind"
              showCopyButton={false}
            />
            <p className="text-center text-sm text-muted mt-4">
              Shapes and dtypes are known at compile time, so invalid tensor math never reaches production.
            </p>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4">
              <h2 className="section-title text-left !mb-0">The problems we solve</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="section-lede text-left !mx-0 !max-w-none">
                Today's AI stacks are fragmented: Python for research, C++/CUDA for performance, separate runtimes for cloud and edge.
                Models fail in production with runtime shape mismatches, training loops carry per-iteration autodiff overhead, and regulated industries can't get reproducible builds.
              </p>
            </div>
          </div>

          <div className="grid grid--three">
            <div className="card">
              <Grid3X3 className="card-icon" />
              <h3>Runtime shape bugs</h3>
              <p>Tensor shape and dtype errors surface in production, not during development. MIND catches these at compile time with static tensor types.</p>
            </div>

            <div className="card">
              <Terminal className="card-icon" />
              <h3>Fragmented toolchains</h3>
              <p>Python for prototypes, C++ for production, glue code everywhere. MIND gives you one language from research to deployment.</p>
            </div>

            <div className="card">
              <CheckCircle className="card-icon" />
              <h3>Non-deterministic builds</h3>
              <p>Can't reproduce training runs or audit model provenance for compliance. MIND delivers 100% bit-identical reproducible builds and deterministic execution mode.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What MIND Does Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4">
              <h2 className="section-title text-left !mb-0">What MIND does</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="section-lede text-left !mx-0 !max-w-none">
                A programming language and compiler stack built specifically for AI and numerical computing —
                tensor-native types, static shape checks, automatic differentiation, and MLIR-powered code generation, all in one toolchain.
              </p>
            </div>
          </div>

          <div className="grid grid--three">
            <div className="card">
              <Grid3X3 className="card-icon" />
              <h3>Tensor-native and statically checked</h3>
              <p>Shapes, dtypes, and device semantics live in the type system, catching whole classes of bugs at compile time instead of at runtime.</p>
            </div>

            <div className="card">
              <Clock className="card-icon" />
              <h3>Compile-time autodiff</h3>
              <p>Gradients computed once during compilation, not on every training iteration. No runtime tape overhead.</p>
            </div>

            <div className="card">
              <CheckCircle className="card-icon" />
              <h3>Deterministic execution & auditable builds</h3>
              <p>100% bit-identical reproducible builds verified via cryptographic hashing. Every compilation produces identical output — critical for regulated ML and model certification.</p>
              <p className="mt-3 text-sm">
                <Link href="/enterprise" className="text-primary hover:underline">Enterprise audit logs →</Link>
                {" · "}
                <Link href="/docs/security" className="text-primary hover:underline">Security details →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title text-left">How it works</h2>

          <div className="grid grid--two">
            <div className="card card--outline">
              <div className="w-full h-64 flex items-center justify-center mb-6">
                <img src="/img/stack-language.svg" className="max-h-full max-w-full object-contain" alt="Language and type system diagram" loading="lazy" />
              </div>
              <h3>Language & type system</h3>
              <p className="flex-1">A Rust-inspired language with first-class tensors, deterministic memory management, and built-in automatic differentiation.</p>
              <ul className="list">
                <li>Shape- and dtype-aware tensors</li>
                <li>Differentiable functions with compiler-generated gradients</li>
                <li>Device annotations for CPU, GPU, and future accelerators</li>
              </ul>
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm">
                <strong className="text-emerald-800">Compiler & language:</strong> <span className="text-emerald-700">Apache 2.0</span>
              </div>
            </div>

            <div className="card card--outline">
              <div className="w-full h-64 flex items-center justify-center mb-6">
                <img src="/img/stack-compiler.svg" className="max-h-full max-w-full object-contain" alt="Compiler and runtime diagram" loading="lazy" />
              </div>
              <h3>Compiler & runtime</h3>
              <p className="flex-1">Source code is lowered into a custom MLIR dialect and then into LLVM IR, producing optimized binaries and modular runtimes for CPU and accelerators.</p>
              <ul className="list">
                <li>MLIR-based IR for tensor and graph optimizations</li>
                <li>LLVM for hardware-specific code generation</li>
                <li>Lean runtime modules for AOT, JIT, and embedded targets</li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <strong className="text-blue-800">Runtime & hosted control plane:</strong> <span className="text-blue-700">Commercial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4">
              <h2 className="section-title text-left !mb-0">Performance That Matters</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="section-lede text-left !mx-0 !max-w-none">
                MIND optimizes both compilation and runtime — fast iteration during development AND production performance when it matters.
              </p>
            </div>
          </div>

          <div className="grid grid--three">
            <div className="card">
              <Clock className="card-icon" />
              <h3>Fast Compilation</h3>
              <p>Compile ML programs in ~100-187 µs. Scientific benchmarks (subprocess overhead subtracted) show massive speedups over all major ML compilers.</p>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <span className="text-emerald-700 font-bold text-sm">Scientific methodology (Jan 2026)</span>
                <span className="text-emerald-600 text-sm block">14,769× faster than PyTorch 2.0</span>
                <span className="text-emerald-600 text-sm block">2,699× faster than JAX</span>
                <span className="text-emerald-600 text-sm block">4,040× faster than Mojo</span>
              </div>
              <p className="mt-3 text-xs text-center text-muted">
                <Link href="/docs/performance#compilation-speed-mind-vs-pytorch-20" className="text-primary hover:underline">PyTorch benchmarks</Link>
                {" · "}
                <Link href="/docs/performance#compilation-speed-mind-vs-mojo" className="text-primary hover:underline">Mojo benchmarks</Link>
              </p>
            </div>

            <div className="card">
              <CheckCircle className="card-icon" />
              <h3>Deterministic Mode</h3>
              <p>100% bit-identical builds verified via SHA256 cryptographic hashing. Every compilation produces identical output — essential for regulated industries and model certification.</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-bold text-sm">Verified reproducibility</span>
                <span className="text-blue-600 text-sm block">100% bit-level determinism</span>
              </div>
            </div>

            <div className="card">
              <TrendingUp className="card-icon" />
              <h3>Low-Overhead Autodiff</h3>
              <p>Gradients computed once during compilation, not on every training iteration. 1,300-11,000× more efficient than runtime autodiff over 1000 iterations.</p>
              <div className="mt-4 p-3 bg-violet-50 rounded-lg">
                <span className="text-violet-700 font-bold text-sm">Compile-time advantage</span>
                <span className="text-violet-600 text-sm block">1,345-11,284× more efficient than PyTorch</span>
                <span className="text-violet-600 text-sm block">No runtime tape or graph construction</span>
              </div>
              <p className="mt-3 text-xs text-center text-muted">
                <Link href="/docs/performance#compile-time-autodiff" className="text-primary hover:underline">Autodiff benchmarks</Link>
              </p>
            </div>
          </div>

          {/* Live Benchmark Demo */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-4">Live Benchmark Demo</h3>
            <p className="text-sm text-muted text-center mb-4">
              Scientific methodology: subprocess overhead subtracted for fair comparison
            </p>
            <div className="rounded-xl overflow-hidden border border-border bg-neutral-900 shadow-lg">
              <video
                className="w-full"
                controls
                autoPlay
                loop
                muted
                playsInline
                poster="/demo/benchmarks/MIND_Scientific_Benchmark.gif"
              >
                <source src="/demo/benchmarks/MIND_Scientific_Benchmark.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-xs text-muted mt-2 text-center">
              All measurements run live — no hardcoded values. MIND vs PyTorch 2.0, JAX, and Mojo.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link href="/docs/performance" className="text-primary font-medium hover:underline">
              See Detailed Benchmarks →
            </Link>
            {" · "}
            <Link href="/compare" className="text-primary font-medium hover:underline">
              Compare with other frameworks →
            </Link>
          </div>
        </div>
      </section>

      {/* Who is MIND for Section */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title text-left">Who is MIND for?</h2>

          <div className="grid grid--three">
            <div className="card">
              <CheckCircle className="card-icon" />
              <h3>Regulated ML & audit trails</h3>
              <p>Healthcare, finance, autonomous systems — industries where model provenance and reproducibility aren't optional. MIND's deterministic builds deliver auditable ML.</p>
            </div>

            <div className="card">
              <Server className="card-icon" />
              <h3>Platform teams scaling ML infrastructure</h3>
              <p>Standardize on one language for research and production. Eliminate glue code between notebooks, services, and accelerators.</p>
            </div>

            <div className="card">
              <Cpu className="card-icon" />
              <h3>Edge & embedded deployment</h3>
              <p>Compile to lean, deterministic binaries that fit into constrained environments where interpreters and heavy runtimes are not an option.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-16 bg-white border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Open core + enterprise</h2>

          <img src="/img/cta-graphic.svg" className="cta-graphic mx-auto max-w-5xl" alt="MIND Architecture" loading="lazy" />

          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-muted mb-4">
              <strong>Community Edition</strong> (Apache 2.0): The compiler and language are open source and ready for experimentation.
            </p>
            <p className="text-muted">
              <strong>Commercial runtime + hosted offerings</strong> from {siteConfig.company}: Deterministic execution mode, audit logs, compliance tooling, and hosted control plane with SLA-backed support.
            </p>
          </div>

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
