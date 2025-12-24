import { Metadata } from "next";
import Link from "next/link";
import { Cloud, Rocket, Layers, GitBranch, Monitor, Database } from "lucide-react";

export const metadata: Metadata = {
    title: "Features",
    description: "Deep dive into the language and compiler features that make MIND a native environment for intelligent systems.",
};

export default function FeaturesPage() {
    return (
        <>
            {/* Hero Banner */}
            <section className="section" style={{ marginTop: "1.25rem" }}>
                <div className="container">
                    <div className="w-full overflow-hidden rounded-xl mb-8 shadow-lg">
                        <img
                            src="/img/features/features.jpg"
                            alt="MIND Features Overview"
                            className="w-full block object-cover"
                            style={{ height: "16vw", minHeight: "160px", maxHeight: "320px" }}
                        />
                    </div>

                    <h1 className="page-title">Features</h1>
                    <p className="text-lg text-muted mb-8">
                        MIND combines a tensor-native language, differentiable programming, and a modern compiler pipeline to give you a unified environment for AI development.
                    </p>

                    <div className="grid grid--three">
                        {/* Tensor-native types */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <img src="/img/features/tensor-cube.svg" className="card-icon mx-auto !w-20 !h-20" alt="Tensor Cube Schematic" loading="lazy" />
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Tensor-native type system</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Tensors are first-class types, not just library objects. Define shapes and dtypes in signatures and let the compiler infer the rest.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Compile-time validation of tensor dimensions</li>
                                <li>Shape inference across function boundaries</li>
                                <li>Safer refactors: incompatible changes fail at build time</li>
                            </ul>
                        </div>

                        {/* MLIR + LLVM */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <img src="/img/features/compiler-pipeline.svg" className="card-icon mx-auto !w-20 !h-20" alt="Compiler Pipeline Schematic" loading="lazy" />
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">MLIR + LLVM compiler pipeline</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                MIND lowers to a custom MLIR dialect for graph ops, then to LLVM IR for hardware-specific generation.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Operator fusion and layout optimization at the MLIR level</li>
                                <li>Reuse of LLVM's mature optimization passes</li>
                                <li>Support for x86, ARM, RISC‑V, WebAssembly, and more</li>
                            </ul>
                        </div>

                        {/* Built-in Autodiff */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <img src="/img/features/autodiff-graph.svg" className="card-icon mx-auto !w-20 !h-20" alt="Autodiff Graph Schematic" loading="lazy" />
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Built-in automatic differentiation</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Mark functions as differentiable and let the compiler generate optimized gradient code at the IR level.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Source-transformation AD in the compiler pipeline</li>
                                <li>Gradients as first-class functions</li>
                                <li>Optimizations applied to forward and backward passes</li>
                            </ul>
                        </div>

                        {/* Device semantics */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <img src="/img/features/device-chip.svg" className="card-icon mx-auto !w-20 !h-20" alt="Device Chip Schematic" loading="lazy" />
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Device semantics in the language</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Express where computations should run and get compile-time checks that your program matches device capabilities.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Device annotations for CPU, GPU, and future accelerators</li>
                                <li>Compile-time validation of unsupported ops on targets</li>
                                <li>Multi-target builds from a single source codebase</li>
                            </ul>
                        </div>

                        {/* Deterministic builds & safety */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <img src="/img/features/security-shield.svg" className="card-icon mx-auto !w-20 !h-20" alt="Security Shield Schematic" loading="lazy" />
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Deterministic builds & safety</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                The compiler is written in Rust and produces deterministic, reproducible binaries. Fully auditable runtime execution.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Rust-style memory safety and concurrency guarantees</li>
                                <li>Bit-for-bit reproducible builds given the same inputs</li>
                                <li>Lean runtime surface area for secure deployments</li>
                            </ul>
                        </div>

                        {/* Open-core */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <img src="/img/features/open-core.svg" className="card-icon mx-auto !w-20 !h-20" alt="Open Core Schematic" loading="lazy" />
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Open-core, extensible design</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                The core compiler is MIT-licensed. Add private backends and runtimes without forking the language.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Open-source core for community innovation</li>
                                <li>Pluggable executors for custom hardware</li>
                                <li>FFI hooks for C/C++ and Python interoperability</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full-Stack AI Section */}
            <section className="section bg-gradient-to-b from-slate-50 to-white py-20">
                <div className="container">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                            Full-Stack Vision
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                            From Model to Production
                        </h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            MIND goes beyond language features to provide a complete platform for building, deploying, and scaling AI systems.
                        </p>
                    </div>

                    <div className="grid grid--three">
                        {/* Distributed Execution */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <div className="w-20 h-20 flex items-center justify-center bg-indigo-50 rounded-2xl mb-4">
                                <Cloud className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Distributed Execution</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Train and deploy models across multiple nodes with automatic sharding and gradient synchronization.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Data parallelism with automatic gradient sync</li>
                                <li>Model parallelism for large models</li>
                                <li>Collective communication (NCCL, Gloo)</li>
                            </ul>
                        </div>

                        {/* Production Deployment */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-2xl mb-4">
                                <Rocket className="w-10 h-10 text-orange-600" />
                            </div>
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Production Deployment</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Deploy models to cloud, edge, or on-premise environments with a single command and built-in serving infrastructure.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Containerized deployment with auto-scaling</li>
                                <li>A/B testing and canary deployments</li>
                                <li>Edge optimization for IoT devices</li>
                            </ul>
                        </div>

                        {/* Model Versioning */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <div className="w-20 h-20 flex items-center justify-center bg-green-50 rounded-2xl mb-4">
                                <GitBranch className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Model Versioning</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Track model experiments, compare versions, and roll back deployments with integrated versioning.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Git-like model versioning</li>
                                <li>Experiment tracking and comparison</li>
                                <li>Reproducible training runs</li>
                            </ul>
                        </div>

                        {/* Observability */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <div className="w-20 h-20 flex items-center justify-center bg-purple-50 rounded-2xl mb-4">
                                <Monitor className="w-10 h-10 text-purple-600" />
                            </div>
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Observability & Monitoring</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Built-in metrics, logging, and tracing for production models with alerting and drift detection.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Real-time inference metrics</li>
                                <li>Data and model drift detection</li>
                                <li>OpenTelemetry integration</li>
                            </ul>
                        </div>

                        {/* Data Pipelines */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <div className="w-20 h-20 flex items-center justify-center bg-cyan-50 rounded-2xl mb-4">
                                <Database className="w-10 h-10 text-cyan-600" />
                            </div>
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">Data Pipelines</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Efficient data loading, transformation, and augmentation pipelines integrated with the type system.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Streaming data ingestion</li>
                                <li>Type-safe transformations</li>
                                <li>Parallel data loading</li>
                            </ul>
                        </div>

                        {/* End-to-End Integration */}
                        <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                            <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-2xl mb-4">
                                <Layers className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="min-h-[2rem] flex items-center justify-center text-xs tracking-tight">End-to-End Integration</h3>
                            <p className="min-h-[8rem] flex items-center text-left w-full">
                                Unified workflow from data preparation through training to production with consistent tooling.
                            </p>
                            <hr className="w-16 border-t-2 border-primary/20 mx-auto my-3" />
                            <ul className="list text-left w-full">
                                <li>Unified CLI and API</li>
                                <li>CI/CD pipeline integration</li>
                                <li>Infrastructure as code</li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/roadmap" className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                            View Full Roadmap
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
