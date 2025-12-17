import { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Box, FileText, Zap, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "Ecosystem",
    description: "MIND is built on an open-core model. The language and compiler are fully open, while specialized runtimes power enterprise scale.",
};

export default function EcosystemPage() {
    return (
        <div className="pb-20">
            {/* Hero Banner */}
            <section className="section" style={{ marginTop: "1.25rem" }}>
                <div className="container">
                    <div className="w-full overflow-hidden rounded-xl mb-8 shadow-lg bg-gray-200">
                        <img
                            src="/img/features/ecosystem.jpg"
                            alt="Ecosystem Banner"
                            className="w-full block object-cover"
                            style={{ height: "16vw", minHeight: "160px", maxHeight: "320px" }}
                        />
                    </div>
                    <h1 className="page-title">The Ecosystem</h1>
                    <p className="text-lg text-muted mb-8">
                        MIND is built on an open-core model. The language and compiler are fully open, while specialized runtimes power enterprise scale.
                    </p>
                </div>
            </section>

            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* MIND Compiler */}
                    <div className="card flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow border border-card-border p-6 rounded-xl !bg-footer-bg">
                        <div className="w-[100px] h-[100px] mb-6 text-primary flex items-center justify-center">
                            <img src="/img/ecosystem/mind-compiler.svg" alt="Mind Compiler" className="w-full h-full" />
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-6 w-full">
                            <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white text-slate-700 px-2.5 py-0.5 text-xs font-bold">
                                mind
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 px-2.5 py-0.5 text-xs font-bold">
                                Apache 2.0
                            </span>
                        </div>

                        <p className="text-muted leading-relaxed mb-6 flex-grow text-left w-full">
                            The official Rust implementation of the compiler. Includes the CLI, type checker, MIR/MLIR lowerings, and CPU executor.
                        </p>

                        <ul className="w-full mb-6 space-y-2 text-sm text-foreground text-left inline-block max-w-xs mx-auto list-none pl-0">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Built-in CLI & Type Checker
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> MIR/MLIR Optimization Pipeline
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Native CPU Execution
                            </li>
                        </ul>

                        <a
                            href={siteConfig.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-6 self-center px-8"
                        >
                            View on GitHub
                        </a>
                    </div>

                    {/* MIND Spec */}
                    <div className="card flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow border border-card-border p-6 rounded-xl !bg-footer-bg">
                        <div className="w-[100px] h-[100px] mb-6 text-indigo-500 flex items-center justify-center">
                            <img src="/img/ecosystem/mind-spec.svg" alt="Mind Spec" className="w-full h-full" />
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-4 w-full">
                            <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white text-slate-700 px-2.5 py-0.5 text-xs font-bold">
                                mind-spec
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 px-2.5 py-0.5 text-xs font-bold">
                                Apache 2.0
                            </span>
                        </div>

                        <p className="text-muted leading-relaxed mb-6 flex-grow text-left w-full">
                            The authoritative language specification, design documents, and RFCs. Changes to the language start here.
                        </p>

                        <ul className="w-full mb-6 space-y-2 text-sm text-foreground text-left inline-block max-w-xs mx-auto list-none pl-0">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Formal Language Specification
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> RFC Design Documents
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Community Governance
                            </li>
                        </ul>

                        <a
                            href={siteConfig.specRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-6 self-center px-8"
                        >
                            View on GitHub
                        </a>
                    </div>

                    {/* MIND Runtime */}
                    <div className="card flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow border border-card-border p-6 rounded-xl !bg-footer-bg">
                        <div className="w-[100px] h-[100px] mb-6 text-orange-500 flex items-center justify-center">
                            <img src="/img/ecosystem/mind-runtime.svg" alt="Mind Runtime" className="w-full h-full" />
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-4 w-full">
                            <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white text-slate-700 px-2.5 py-0.5 text-xs font-bold">
                                mind-runtime
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-orange-200 bg-orange-50 text-orange-700 px-2.5 py-0.5 text-xs font-bold">
                                Commercial
                            </span>
                        </div>

                        <p className="text-muted leading-relaxed mb-6 flex-grow text-left w-full">
                            High-performance runtime extensions for massive distributed training and specific hardware accelerators.
                        </p>

                        <ul className="w-full mb-6 space-y-2 text-sm text-foreground text-left inline-block max-w-xs mx-auto list-none pl-0">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Massive Distributed Training
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Custom Hardware Accelerators
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" /> Enterprise Support & SLAs
                            </li>
                        </ul>

                        <a
                            href={`mailto:${siteConfig.contactEmail}`}
                            className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-6 self-center px-8"
                        >
                            Contact Sales
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
