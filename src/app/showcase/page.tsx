import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Showcase",
    description: "See how MIND powers real-world AI and GPU computing applications.",
};

export default function ShowcasePage() {
    return (
        <>
            <section className="section" style={{ marginTop: "1.25rem" }}>
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="page-title mb-6">Built with MIND</h1>
                        <p className="text-xl text-muted">
                            Real-world applications demonstrating MIND's capabilities in GPU computing and AI.
                        </p>
                    </div>

                    <div className="grid grid--three">
                        {/* Mind-Ray */}
                        <div className="card card--outline p-0 overflow-hidden flex flex-col">
                            <div className="h-48 bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/favicon.svg" alt="MIND" className="h-20 w-auto" loading="lazy" />
                                <span className="text-white text-3xl font-bold">Mind-Ray</span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                                        GPU Computing
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">GPU Path Tracer</h3>
                                <p className="text-muted text-sm flex-1">
                                    High-performance path tracer with BVH-accelerated CUDA backend. Benchmarked against Mitsuba 3, Cycles, Falcor, and LuxCore.
                                </p>
                                <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                                    <span className="text-emerald-700 font-bold text-sm">Performance</span>
                                    <span className="text-emerald-600 text-sm block">10-50x faster than industry engines</span>
                                    <span className="text-emerald-600 text-sm block">48x steady-state speedup vs Mitsuba 3</span>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <a
                                        href="https://github.com/cputer/mind-ray"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        View on GitHub <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* NikolaChess */}
                        <div className="card card--outline p-0 overflow-hidden flex flex-col">
                            <div className="h-48 bg-white flex items-center justify-center p-6">
                                <img
                                    src="https://nikolachess.com/nikola_latest_logo.svg"
                                    alt="NikolaChess"
                                    className="h-28 w-auto"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
                                        Game AI
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">NNUE Chess Engine</h3>
                                <p className="text-muted text-sm flex-1">
                                    GPU-accelerated chess engine with Stockfish-compatible NNUE evaluation, Syzygy tablebase support, and advanced time management.
                                </p>
                                <div className="mt-4 p-3 bg-violet-50 rounded-lg">
                                    <span className="text-violet-700 font-bold text-sm">Features</span>
                                    <span className="text-violet-600 text-sm block">+600 Elo with NNUE evaluation</span>
                                    <span className="text-violet-600 text-sm block">GPU-accelerated search via MIND Runtime</span>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <a
                                        href="https://github.com/cputer/NikolaChess"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        View on GitHub <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Fractal Voyager */}
                        <div className="card card--outline p-0 overflow-hidden flex flex-col">
                            <div className="h-48 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex flex-col items-center justify-center gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/favicon.svg" alt="MIND" className="h-20 w-auto" loading="lazy" />
                                <span className="text-white text-3xl font-bold">Fractal Voyager</span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="inline-block px-2 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
                                        WebGPU / WebGL2
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Real-time Fractal Explorer</h3>
                                <p className="text-muted text-sm flex-1">
                                    Explore infinite mathematical complexity with GPU-accelerated rendering. Dive into Mandelbrot, Julia, and Burning Ship fractals with buttery-smooth zoom and pan controls.
                                </p>
                                <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                                    <span className="text-pink-700 font-bold text-sm">Features</span>
                                    <span className="text-pink-600 text-sm block">WebGPU compute with WebGL2 fallback</span>
                                    <span className="text-pink-600 text-sm block">Audio-reactive colors from microphone input</span>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4">
                                    <a
                                        href="https://github.com/cputer/fractal-voyager"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        View on GitHub <ArrowRight size={14} />
                                    </a>
                                    <a
                                        href="https://mindlang.dev/demo/fractal/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted font-bold text-sm flex items-center gap-1 hover:gap-2 hover:text-primary transition-all"
                                    >
                                        Live Demo <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 text-center bg-footer-bg dark:bg-card-background rounded-2xl p-12 border border-card-border">
                        <h2 className="text-2xl font-bold mb-4">Building something cool?</h2>
                        <p className="text-muted mb-8 max-w-xl mx-auto">
                            We'd love to hear about your project. Submit your story to be featured in our showcase and newsletter.
                        </p>
                        <a
                            href="mailto:showcase@mindlang.dev"
                            className="btn btn--primary inline-flex items-center"
                        >
                            Submit Your Project
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
