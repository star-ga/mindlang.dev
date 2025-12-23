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
              <img
                src="/img/mind-logo-full.svg"
                alt="MIND Logo"
                className="h-72 w-auto mx-auto"
              />
            </div>

            <p className="eyebrow">MACHINE INTELLIGENCE NATIVE DESIGN</p>
            <h1>
              Intelligence, <span className="accent">compiled.</span>
            </h1>
            <p className="hero-lede text-left">
              MIND is a programming language and compiler stack built specifically for AI and numerical computing —
              tensor-native types, static shape checks, automatic differentiation, and MLIR-powered code generation, all in one toolchain.
            </p>

            <div className="hero-actions">
              <Link href={siteConfig.docsPath} className="btn btn--primary btn--lg">
                Read the language spec
              </Link>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--lg"
              >
                Browse the source
              </a>
            </div>

            <p className="hero-meta">
              Open-core · Rust implementation · MLIR + LLVM pipeline · Deterministic builds
            </p>

            {/* Performance Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-700">38 µs</div>
                <div className="text-sm text-emerald-600">Compilation time</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">247×</div>
                <div className="text-sm text-blue-600">Faster than PyTorch</div>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-violet-700">100%</div>
                <div className="text-sm text-violet-600">Deterministic</div>
              </div>
            </div>
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

      {/* Why MIND Section */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-4">
              <h2 className="section-title text-left !mb-0">Why MIND?</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="section-lede text-left !mx-0 !max-w-none">
                Today's AI stacks are fragmented: Python for research, C++/CUDA for performance, separate runtimes for cloud and edge.
                MIND collapses that into a single language and compiler pipeline.
              </p>
            </div>
          </div>

          <div className="grid grid--three">
            <div className="card">
              <Terminal className="card-icon" />
              <h3>One language from prototype to production</h3>
              <p>Author models, training loops, and serving code in the same language. No "Python version" and "C++ version" to keep in sync.</p>
            </div>

            <div className="card">
              <Grid3X3 className="card-icon" />
              <h3>Tensor-native and statically checked</h3>
              <p>Shapes, dtypes, and device semantics live in the type system, catching whole classes of bugs at compile time instead of at runtime.</p>
            </div>

            <div className="card">
              <Zap className="card-icon" />
              <h3>Compiler-grade performance</h3>
              <p>The compiler lowers through MLIR into LLVM, giving you highly optimized CPU and accelerator code without hand-written kernels.</p>
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
              <h3>Lightning-Fast Compilation</h3>
              <p>Compile ML programs in <strong>38 microseconds</strong> — faster than most frameworks can parse your code.</p>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <span className="text-emerald-700 font-bold">53-247× faster</span>
                <span className="text-emerald-600 text-sm block">than PyTorch 2.0 torch.compile()</span>
              </div>
            </div>

            <div className="card">
              <CheckCircle className="card-icon" />
              <h3>Deterministic Builds</h3>
              <p>Every compilation produces <strong>bit-identical output</strong>. No surprises, no debugging non-deterministic builds.</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-bold">100% reproducibility</span>
                <span className="text-blue-600 text-sm block">verified across 40 test runs</span>
              </div>
            </div>

            <div className="card">
              <TrendingUp className="card-icon" />
              <h3>Compile-Time Autodiff</h3>
              <p>Gradients computed <strong>once during compilation</strong>, not on every training iteration.</p>
              <div className="mt-4 p-3 bg-violet-50 rounded-lg">
                <span className="text-violet-700 font-bold">1,300-13,000× more efficient</span>
                <span className="text-violet-600 text-sm block">than runtime autodiff over 1000 iterations</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/docs/performance" className="text-primary font-medium hover:underline">
              See Detailed Benchmarks →
            </Link>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title text-left">How the stack fits together</h2>

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
            </div>
          </div>
        </div>
      </section>

      {/* Who is MIND for Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-left">Who is MIND for?</h2>

          <div className="grid grid--three">
            <div className="card">
              <Server className="card-icon" />
              <h3>AI platform teams</h3>
              <p>Standardize on one language for research and production. Eliminate glue code between notebooks, services, and accelerators.</p>
            </div>

            <div className="card">
              <Code className="card-icon" />
              <h3>Applied ML engineers</h3>
              <p>Express models in high-level syntax with compiler-checked shapes and gradients. Spend time on modeling, not on fighting build systems.</p>
            </div>

            <div className="card">
              <Cpu className="card-icon" />
              <h3>Edge & embedded builders</h3>
              <p>Compile to lean, deterministic binaries that fit into constrained environments where interpreters and heavy runtimes are not an option.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-16 bg-white border-t border-card-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to explore the language?</h2>

          <img src="/img/cta-graphic.svg" className="cta-graphic mx-auto max-w-5xl" alt="MIND Architecture" loading="lazy" />

          <p className="max-w-2xl mx-auto text-muted mb-8">
            Start with the language spec, then dive into the core implementation. MIND is open-core: the compiler and language are MIT-licensed and ready for experimentation.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={siteConfig.docsPath} className="btn btn--primary btn--lg">
              Open the spec
            </Link>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--lg"
            >
              Clone the repo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
