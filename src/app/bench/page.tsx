import { Metadata } from "next";
import Link from "next/link";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Benchmarks",
  description: "Reproducible, in-browser performance benchmarks for MIND. Run WebGPU compute benchmarks comparing MindLang AOT shaders against ONNX Runtime Web.",
};

export default function BenchPage() {
  return (
    <>
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow">Performance</p>
            <h1 className="!mb-6">Benchmarks</h1>
            <p className="hero-lede">
              Reproducible, in-browser performance benchmarks for MIND. Each benchmark runs
              entirely in your browser via WebGPU — no server, no synthetic numbers.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl mx-auto">
          <div className="grid gap-6">
            <Link
              href="/bench/gemm"
              className="card card--outline group hover:border-primary/40 transition-all no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-50 shrink-0">
                  <Cpu className="w-7 h-7 text-cyan-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-foreground m-0 group-hover:text-primary transition-colors">
                      GEMM — Matrix Multiplication
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-cyan-100 text-cyan-700">
                      WebGPU
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed m-0">
                    Tiled 4096&times;4096 GEMM on WebGPU. Compares MindLang AOT-compiled WGSL
                    shaders against ONNX Runtime Web&apos;s WebGPU backend performing the identical
                    operation. Measures average dispatch time, GFLOPS, and shader compile vs.
                    session init overhead.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted font-mono">
                    <span>16&times;16 workgroups</span>
                    <span>&middot;</span>
                    <span>shared memory tiling</span>
                    <span>&middot;</span>
                    <span>f32 precision</span>
                    <span>&middot;</span>
                    <span>MindLang vs ONNX RT</span>
                  </div>
                </div>
                <div className="text-muted text-xl shrink-0 self-center group-hover:text-primary transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>
          </div>

          <p className="text-sm text-muted text-center mt-10">
            All benchmarks require a browser with WebGPU support (Chrome 113+, Edge 113+).
            Results vary by GPU and driver. Firefox and Safari support is partial — use a
            Chromium-based browser for full accuracy.
          </p>
        </div>
      </section>
    </>
  );
}
