import { Metadata } from "next";

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
        </>
    );
}
