import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Showcase",
    description: "See how companies and developers are using MIND to solve real-world AI problems.",
};

export default function ShowcasePage() {
    return (
        <>
            <section className="section" style={{ marginTop: "1.25rem" }}>
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="page-title mb-6">Built with MIND</h1>
                        <p className="text-xl text-muted">
                            Discover how cutting-edge teams are using MIND to optimize their AI infrastructure and accelerate development.
                        </p>
                    </div>

                    <div className="grid grid--three">
                        {/* Placeholder 1 */}
                        <div className="card card--outline p-0 overflow-hidden flex flex-col">
                            <div className="h-48 bg-slate-100 flex items-center justify-center">
                                <span className="text-muted font-medium">Project Screenshot</span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                                        FinTech
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">High-Frequency Trading</h3>
                                <p className="text-muted text-sm flex-1">
                                    A leading prop trading firm uses MIND to compile custom inference kernels for sub-microsecond latency on FPGAs.
                                </p>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        Read Case Study <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder 2 */}
                        <div className="card card--outline p-0 overflow-hidden flex flex-col">
                            <div className="h-48 bg-slate-100 flex items-center justify-center">
                                <span className="text-muted font-medium">Project Screenshot</span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                        Robotics
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Autonomous Drone Swarm</h3>
                                <p className="text-muted text-sm flex-1">
                                    Using MIND's differentiable programming to optimize control policies in real-time on embedded hardware.
                                </p>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        Read Case Study <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder 3 */}
                        <div className="card card--outline p-0 overflow-hidden flex flex-col">
                            <div className="h-48 bg-slate-100 flex items-center justify-center">
                                <span className="text-muted font-medium">Project Screenshot</span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
                                        Generative AI
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Large Language Models</h3>
                                <p className="text-muted text-sm flex-1">
                                    Optimizing transformer inference across a heterogeneous cluster of GPUs and TPUs with a single codebase.
                                </p>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        Read Case Study <ArrowRight size={14} />
                                    </button>
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
