import { Metadata } from "next";
import { Zap, Cpu, Server, Package, CheckCircle, BookOpen, Wrench, Terminal, Brain, Cloud, Layers, Rocket, Timer, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
    title: "Roadmap",
    description: "The MIND language development roadmap and status of key toolchain components.",
};

export default function RoadmapPage() {
    return (
        <div className="pb-20">
            {/* Hero Banner */}
            <section className="section" style={{ marginTop: "1.25rem" }}>
                <div className="container">
                    <div className="w-full overflow-hidden rounded-xl mb-8 shadow-lg bg-gray-200">
                        <img
                            src="/img/features/roadmap.jpg"
                            alt="Roadmap Banner"
                            className="w-full block object-cover"
                            style={{ height: "16vw", minHeight: "160px", maxHeight: "320px" }}
                        />
                    </div>
                    <h1 className="page-title">Roadmap</h1>
                    <p className="text-lg text-muted mb-8">
                        The MIND language is evolving rapidly. Below is the current status of key components in the 1.0 toolchain.
                    </p>
                </div>
            </section>

            <div className="container max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col gap-6">

                {/* Core Language */}
                <RoadmapCard
                    icon={<Zap className="w-8 h-8 text-primary" />}
                    iconBg="bg-blue-50"
                    title="Core Language"
                    status="Beta"
                    statusColor="bg-slate-100 text-slate-600"
                    progress={100}
                    progressColor="bg-primary"
                    milestone="Q1 2026"
                    description="v1.0-draft spec implemented. Static shapes & dtypes."
                    subDescription={
                        <>
                            Core v1 conformance is defined and tested; see <Link href="/docs/conformance" className="text-primary underline">Conformance</Link> and <Link href="/docs/stability" className="text-primary underline">Stability</Link>.
                        </>
                    }
                    milestoneDescription="The foundational language specification with type system and core syntax."
                />

                {/* Autodiff Engine */}
                <RoadmapCard
                    icon={<Cpu className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Autodiff Engine"
                    status="Complete"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Released"
                    description="Reverse-mode AD for all Core v1 ops: Add, Sub, Mul, Div, MatMul, Dot, Transpose, Sum, Mean, Reshape, Relu, Conv2d, and indexing/slicing operations."
                    milestoneDescription="Full gradient support for Core v1 operations including Conv2d."
                />

                {/* Performance Benchmarks */}
                <RoadmapCard
                    icon={<Timer className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Performance Benchmarks"
                    status="Complete"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Verified Dec 2025"
                    description="Comprehensive benchmarks verified: ~38 µs compilation (53-247× faster than PyTorch 2.0), 100% bit-level determinism, 1,300-13,000× more efficient autodiff."
                    subDescription={
                        <>
                            See <Link href="/docs/performance" className="text-primary underline">Performance</Link> and <Link href="/docs/guides/benchmarks" className="text-primary underline">Running Benchmarks</Link> for full details.
                        </>
                    }
                    milestoneDescription="Python bindings, determinism verification, PyTorch comparison, and documentation complete."
                />

                {/* Info Text */}
                <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-muted space-y-4">
                    <p>
                        See <Link href="/docs/shapes" className="text-primary underline">Shapes & Broadcasting</Link> for practical shape rules and the reference engine.
                    </p>
                    <p>
                        See <Link href="/docs/spec" className="text-primary underline">Core v1 Spec</Link>, <Link href="/docs/conformance" className="text-primary underline">Conformance</Link>, and <Link href="/docs/stability" className="text-primary underline">Stability & Versioning</Link> for official guarantees.
                    </p>
                    <p>
                        For practical usage examples, visit <Link href="/docs/using-core-v1" className="text-primary underline">Using Core v1 Today</Link> and the <Link href="/docs/cookbook" className="text-primary underline">Cookbook</Link>.
                    </p>
                </div>

                {/* Full-Stack AI Vision Section */}
                <div className="!bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-primary/20 rounded-xl p-8 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Layers className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold text-foreground m-0">Full-Stack AI Vision</h2>
                    </div>
                    <p className="text-muted mb-6">
                        MIND is evolving beyond a tensor language into a complete full-stack platform for AI development. Our vision encompasses the entire AI lifecycle from model development to production deployment.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Cloud className="w-6 h-6 text-primary mb-2" />
                            <h4 className="font-bold text-sm mb-1">Distributed Execution</h4>
                            <p className="text-xs text-muted">Scale models across clusters with automatic sharding and gradient synchronization.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Rocket className="w-6 h-6 text-primary mb-2" />
                            <h4 className="font-bold text-sm mb-1">Production Deployment</h4>
                            <p className="text-xs text-muted">One-command deployment to cloud, edge, or on-premise with built-in serving infrastructure.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Server className="w-6 h-6 text-primary mb-2" />
                            <h4 className="font-bold text-sm mb-1">End-to-End Integration</h4>
                            <p className="text-xs text-muted">Seamless data pipelines, model versioning, and monitoring from a unified platform.</p>
                        </div>
                    </div>
                </div>

                {/* CPU Execution */}
                <RoadmapCard
                    icon={<Terminal className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="CPU Execution"
                    status="Stable"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Released"
                    description="Deterministic CPU backend via the MIND runtime interface (Phase-1 ops)."
                    milestoneDescription="Production-ready CPU execution with optimized compilation."
                />

                {/* GPU / Accelerators */}
                <RoadmapCard
                    icon={<Server className="w-8 h-8 text-primary" />}
                    iconBg="bg-blue-50"
                    title="GPU / Accelerators"
                    status="Mock Backend"
                    statusColor="bg-violet-100 text-violet-700"
                    progress={17}
                    progressColor="bg-primary"
                    milestone="Conformance ready"
                    description="Mock GPU backend supports full Core v1 op surface (19 ops) via CPU delegation, enforcing GPU constraints (f32-only, alignment). Native CUDA, ROCm, and Metal kernels planned."
                    milestoneDescription="Production CUDA 12, ROCm, and Metal backends in development for native GPU execution."
                />

                {/* Package Manager */}
                <RoadmapCard
                    icon={<Package className="w-8 h-8 text-primary" />}
                    iconBg="bg-blue-50"
                    title="Package Manager"
                    status="Planned"
                    statusColor="bg-slate-100 text-slate-600"
                    progress={15}
                    progressColor="bg-primary"
                    milestone="2026"
                    description="Early groundwork for module and dependency resolution with ecosystem foundations underway."
                    milestoneDescription="Comprehensive package management and dependency resolution."
                />

                {/* BCI / Neuroscience - Phase 13 */}
                <RoadmapCard
                    icon={<Brain className="w-8 h-8 text-pink-600" />}
                    iconBg="bg-pink-50"
                    title="BCI & Neuroscience"
                    status="Phase 13"
                    statusColor="bg-pink-100 text-pink-700"
                    progress={5}
                    progressColor="bg-pink-500"
                    milestone="2026"
                    description="Ultra-low latency runtime paths, streaming tensor support, and signal processing primitives for brain-computer interface and neuroscience applications."
                    subDescription={
                        <>
                            Targeting {"<"}1ms inference latency, pre-allocated memory pools, and deterministic timing guarantees for medical device certification.
                        </>
                    }
                    milestoneDescription="Initial research and design phase. Runtime optimizations, signal processing stdlib, and language extensions planned for late 2026."
                />

                {/* Distributed Execution - Phase 14 */}
                <RoadmapCard
                    icon={<Cloud className="w-8 h-8 text-indigo-600" />}
                    iconBg="bg-indigo-50"
                    title="Distributed Execution"
                    status="Phase 14"
                    statusColor="bg-indigo-100 text-indigo-700"
                    progress={25}
                    progressColor="bg-indigo-500"
                    milestone="2026"
                    description="Multi-node training and inference with automatic model sharding, data parallelism, and collective communication (NCCL, Gloo)."
                    subDescription={
                        <>
                            See <Link href="/docs/distributed" className="text-primary underline">Distributed Execution Guide</Link> for early access documentation.
                        </>
                    }
                    milestoneDescription="Full-stack distributed training with pipeline parallelism and elastic scaling."
                />

                {/* Deployment & Serving - Phase 15 */}
                <RoadmapCard
                    icon={<Rocket className="w-8 h-8 text-orange-600" />}
                    iconBg="bg-orange-50"
                    title="Deployment & Serving"
                    status="Phase 15"
                    statusColor="bg-orange-100 text-orange-700"
                    progress={20}
                    progressColor="bg-orange-500"
                    milestone="2026"
                    description="Production-ready model serving with containerized deployment, auto-scaling, A/B testing, and model versioning."
                    subDescription={
                        <>
                            See <Link href="/docs/deployment" className="text-primary underline">Deployment Guide</Link> for deployment options and best practices.
                        </>
                    }
                    milestoneDescription="One-command deployment to cloud, edge, and on-premise environments."
                />

                {/* Testing & Conformance */}
                <RoadmapCard
                    icon={<CheckCircle className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Testing & Conformance"
                    status="Complete"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Complete"
                    description="Spec aligned with implementations. 20 IR instructions, 47 E-codes, 1e-5 numerical tolerance. 154 compiler tests, 37 runtime tests, all passing."
                    milestoneDescription="Compiler and runtime implementations fully match spec. Conformance test suite complete."
                />

                {/* Documentation Alignment */}
                <RoadmapCard
                    icon={<BookOpen className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Documentation Alignment"
                    status="Complete"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Synchronized"
                    description="All spec files aligned: ir.md, autodiff.md, ffi.md, runtime.md, types.md, errors.md. CHANGELOG.md present in all repos."
                    milestoneDescription="Specification-grade documentation across compiler, runtime, and spec repos."
                />

                {/* Language Toolchain */}
                <RoadmapCard
                    icon={<Wrench className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Language Toolchain & Lowering"
                    status="Operational"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={95}
                    progressColor="bg-emerald-500"
                    description="5 MLIR dialects (arith, tensor, linalg, func, scf). Tested with LLVM 18. 7 FFI functions, 3 enums, 2 opaque types."
                    milestone="Core pipeline operational"
                    milestoneDescription="Full compiler workflow. GPU/accelerator extensions in progress."
                />

                {/* Performance Roadmap Section */}
                <div className="!bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-8 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-8 h-8 text-emerald-600" />
                        <h2 className="text-2xl font-bold text-foreground m-0">Performance Roadmap</h2>
                    </div>
                    <p className="text-muted mb-6">
                        MIND&apos;s performance story continues with runtime benchmarks, GPU support, and further compilation optimizations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Target className="w-6 h-6 text-emerald-600 mb-2" />
                            <h4 className="font-bold text-sm mb-1">Q1 2026: Runtime Benchmarks</h4>
                            <p className="text-xs text-muted">CPU backend benchmarks (matmul, conv2d), memory bandwidth tests, comparison with NumPy/PyTorch/JAX runtime.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Timer className="w-6 h-6 text-emerald-600 mb-2" />
                            <h4 className="font-bold text-sm mb-1">Q2-Q3 2026: Compilation Opts</h4>
                            <p className="text-xs text-muted">Target &lt;20 µs compilation, incremental compilation, result caching, parallel type checking.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Cpu className="w-6 h-6 text-emerald-600 mb-2" />
                            <h4 className="font-bold text-sm mb-1">2027+: Advanced Opts</h4>
                            <p className="text-xs text-muted">Sub-10 µs compilation (4× improvement), GPU runtime benchmarks (CUDA, Metal), distributed compilation.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-8 rounded-xl !bg-footer-bg p-8 md:p-12 text-center shadow-lg border border-card-border relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                            Stay Updated
                        </h2>
                        <p className="text-lg text-muted mb-10 max-w-lg mx-auto leading-relaxed">
                            Follow our progress and get notified about major milestones in the MIND language development.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/docs"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary !text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-all hover:shadow-lg"
                            >
                                View Documentation
                            </Link>

                            <Link
                                href="/community"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-foreground border border-slate-200 font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-all"
                            >
                                Join Community
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base">
                            <span className="font-bold text-foreground">Technical deep-dives:</span>
                            <a href="https://github.com/cputer/mind/blob/main/docs/autodiff.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Autodiff design</a>
                            <a href="https://github.com/cputer/mind/blob/main/docs/ir.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IR core</a>
                            <a href="https://github.com/cputer/mind/blob/main/docs/mlir-lowering.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MLIR lowering pipeline</a>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.02) 0%, transparent 70%)"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Helper Component for Roadmap Item
function RoadmapCard({
    icon,
    iconBg,
    title,
    status,
    statusColor,
    progress,
    progressColor,
    milestone,
    description,
    subDescription,
    milestoneDescription
}: {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    status: string;
    statusColor: string;
    progress: number;
    progressColor: string;
    milestone: string;
    description: string;
    subDescription?: React.ReactNode;
    milestoneDescription: string;
}) {
    return (
        <div className="!bg-footer-bg border border-card-border rounded-xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_1.5fr] gap-6 md:gap-8 items-start md:items-center shadow-sm hover:shadow-md transition-shadow">
            {/* Icon */}
            <div className={`p-4 rounded-xl ${iconBg} inline-flex lg:self-center self-start`}>
                {icon}
            </div>

            {/* Title & Status */}
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground m-0">{title}</h3>
                <span className={`inline-block text-xs px-2.5 py-0.5 rounded-md mt-2 font-bold uppercase tracking-wide ${statusColor}`}>
                    {status}
                </span>
            </div>

            {/* Progress & Milestone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
                {/* Progress Bar Column */}
                <div>
                    <div className="flex justify-between text-sm text-muted mb-2 font-medium">
                        <span>Progress</span>
                        <span className="text-foreground font-bold">{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${progressColor}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                        {description}
                    </p>
                    {subDescription && <p className="mt-2 text-xs text-muted leading-relaxed">{subDescription}</p>}
                </div>

                {/* Milestone Column */}
                <div>
                    <div className="flex items-center gap-2 text-muted text-sm mb-2 font-medium">
                        <span className="text-foreground font-bold">{milestone}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                        {milestoneDescription}
                    </p>
                </div>
            </div>
        </div>
    );
}
