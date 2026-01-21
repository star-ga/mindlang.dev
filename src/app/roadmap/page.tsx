import { Metadata } from "next";
import { Zap, Cpu, Server, Package, CheckCircle, BookOpen, Wrench, Terminal, Brain, Cloud, Layers, Rocket, Timer, Target, TrendingUp, Users, Code, Shield, FileCheck, Sparkles } from "lucide-react";
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
                    milestone="Verified"
                    description="Windows 11: ~38 µs (1,100-2,100× faster). Ubuntu Linux: 25-53 µs (800-3,200× faster). Both vs PyTorch 2.0 (inductor). 100% bit-level determinism, ~650× faster than Mojo."
                    subDescription={
                        <>
                            See <Link href="/docs/performance" className="text-primary underline">Performance</Link> and <Link href="/docs/guides/benchmarks" className="text-primary underline">Running Benchmarks</Link> for full details.
                        </>
                    }
                    milestoneDescription="Python bindings, determinism verification, PyTorch comparison, and documentation complete."
                />

                {/* Quick Reference Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/docs/shapes" className="group block p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-primary/40 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <Layers className="w-5 h-5 text-primary" />
                            <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">Shapes & Broadcasting</h4>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">Practical shape rules and the reference engine.</p>
                    </Link>
                    <a href="https://github.com/star-ga/mind-spec" target="_blank" rel="noopener noreferrer" className="group block p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <h4 className="font-bold text-sm text-foreground group-hover:text-emerald-600 transition-colors">Core v1 Spec</h4>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">Official spec, conformance, and stability guarantees.</p>
                    </a>
                    <Link href="/docs/using-core-v1" className="group block p-5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-5 h-5 text-violet-600" />
                            <h4 className="font-bold text-sm text-foreground group-hover:text-violet-600 transition-colors">Using Core v1</h4>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">Getting started with practical usage examples.</p>
                    </Link>
                    <Link href="/docs/cookbook" className="group block p-5 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-5 h-5 text-orange-600" />
                            <h4 className="font-bold text-sm text-foreground group-hover:text-orange-600 transition-colors">Cookbook</h4>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">Ready-to-use recipes and code patterns.</p>
                    </Link>
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

                {/* GPU / Accelerators - UPDATED */}
                <RoadmapCard
                    icon={<Server className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="GPU / Accelerators"
                    status="All Production"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Complete Dec 2025"
                    description="All 4 GPU backends production-ready: CUDA (NVIDIA), Metal (Apple), ROCm/HIP (AMD), and WebGPU (cross-platform). Full trait implementations with poison-safe locking, defragmentation, and context recovery."
                    subDescription={
                        <>
                            Enterprise runtime achieves 35% faster matmul (TF32), 40% faster FP16, 98% memory bandwidth. Available via <Link href="/enterprise" className="text-primary underline">Enterprise license</Link>. All backends implement StreamSync, ContextRecovery, and Defragmenter traits.
                        </>
                    }
                    milestoneDescription="Production GPU backends for NVIDIA, AMD, Apple Silicon, and browsers/native via WebGPU."
                />

                {/* Package Manager */}
                <RoadmapCard
                    icon={<Package className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Package Manager"
                    status="Complete"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Jan 2026"
                    description="Production-ready package management: PubGrub CDCL resolver with multi-version isolation, content-addressed storage, sparse registry protocol, workspace/monorepo support, and comprehensive security features."
                    subDescription={
                        <>
                            Includes SLSA provenance attestations with Ed25519 signing, SBOM generation (SPDX 3.0 + CycloneDX 1.5), OSV vulnerability scanning, and policy enforcement gates. MLO consensus: 9.67/10.
                        </>
                    }
                    milestoneDescription="Enterprise-grade package management with supply chain security and compliance features."
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

                {/* Distributed Execution - Complete */}
                <RoadmapCard
                    icon={<Cloud className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Distributed Execution"
                    status="Complete"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Jan 2026"
                    description="Production-ready distributed training: TCP transport with connection pooling and ring topology, NCCL/Gloo backends, bandwidth-optimal RingAllReduce, pipeline parallelism with micro-batching, and comprehensive fault tolerance."
                    subDescription={
                        <>
                            Elastic training with heartbeat monitoring, checkpoint recovery, and ClusterHealth tracking. See <Link href="/docs/distributed" className="text-primary underline">Distributed Execution Guide</Link>.
                        </>
                    }
                    milestoneDescription="Full-stack distributed training with data/model/pipeline parallelism and elastic scaling."
                />

                {/* Deployment & Serving - Complete */}
                <RoadmapCard
                    icon={<Rocket className="w-8 h-8 text-emerald-500" />}
                    iconBg="bg-emerald-50"
                    title="Deployment & Serving"
                    status="Complete"
                    statusColor="bg-emerald-100 text-emerald-700"
                    progress={100}
                    progressColor="bg-emerald-500"
                    milestone="Released"
                    description="Production-ready model serving: native + ONNX export with quantization, HTTP/gRPC inference server, dynamic batching, Prometheus metrics, Kubernetes health checks."
                    subDescription={
                        <>
                            See <Link href="/docs/deployment" className="text-primary underline">Deployment Guide</Link> for deployment options and best practices.
                        </>
                    }
                    milestoneDescription="Full model serving infrastructure with export, inference, metrics, and health monitoring."
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
                    description="Spec aligned with implementations. 20 IR instructions, 47 E-codes, 1e-5 numerical tolerance. 175+ compiler tests, 136 runtime tests, all passing."
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
                    progress={100}
                    progressColor="bg-emerald-500"
                    description="5 MLIR dialects (arith, tensor, linalg, func, scf). Tested with LLVM 18. 7 FFI functions, 3 enums, 2 opaque types."
                    milestone="Core pipeline operational"
                    milestoneDescription="Full compiler workflow with all GPU backends production-ready."
                />

                {/* Full-Stack AI Vision Section */}
                <div className="!bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-primary/20 rounded-xl p-8">
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

                {/* GPU Performance Achievements */}
                <div className="!bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-8 h-8 text-emerald-600" />
                        <h2 className="text-2xl font-bold text-foreground m-0">GPU Performance (Enterprise)</h2>
                    </div>
                    <p className="text-muted mb-6">
                        The CUDA backend delivers production-grade GPU acceleration with verified benchmarks on NVIDIA hardware.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Target className="w-6 h-6 text-emerald-600 mb-2" />
                            <h4 className="font-bold text-sm mb-1">180x Faster Memory</h4>
                            <p className="text-xs text-muted">CachingAllocator achieves 8.3M allocs/sec vs PyTorch&apos;s 46K/sec. Zero cudaMalloc overhead.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Timer className="w-6 h-6 text-emerald-600 mb-2" />
                            <h4 className="font-bold text-sm mb-1">35-40% Faster MatMul</h4>
                            <p className="text-xs text-muted">TF32 Tensor Cores with cuBLASLt. FP16/FP8 support for Ada Lovelace and newer GPUs.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Cpu className="w-6 h-6 text-emerald-600 mb-2" />
                            <h4 className="font-bold text-sm mb-1">98% Bandwidth</h4>
                            <p className="text-xs text-muted">Elementwise ops achieve 250 GB/s on RTX 4070 (256 GB/s peak). float4 vectorization.</p>
                        </div>
                    </div>
                    <p className="text-xs text-muted mt-4 text-center">
                        Benchmarked on RTX 4070 (SM_89, Ada Lovelace). Performance scales with GPU capabilities. <Link href="/enterprise" className="text-primary underline">Enterprise license required</Link>.
                    </p>
                </div>

                {/* Performance Roadmap Section */}
                <div className="!bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-primary/20 rounded-xl p-8 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold text-foreground m-0">Performance Roadmap</h2>
                    </div>
                    <p className="text-muted mb-6">
                        With CUDA benchmarks complete, MIND continues optimization across the stack.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm border-2 border-emerald-200">
                            <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
                            <h4 className="font-bold text-sm mb-1 text-emerald-700">Complete: CUDA Backend</h4>
                            <p className="text-xs text-muted">CUDA backend verified Dec 2025. 180x memory, 35% matmul improvement vs PyTorch.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Timer className="w-6 h-6 text-primary mb-2" />
                            <h4 className="font-bold text-sm mb-1">Complete: ROCm, Metal & WebGPU</h4>
                            <p className="text-xs text-muted">ROCm (AMD), Metal (Apple Silicon), WebGPU (browsers/native) all production-ready.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <Cpu className="w-6 h-6 text-primary mb-2" />
                            <h4 className="font-bold text-sm mb-1">2026+: Compilation Opts</h4>
                            <p className="text-xs text-muted">Target &lt;20 µs compilation, incremental compilation, result caching.</p>
                        </div>
                    </div>
                </div>

                {/* Ecosystem Evolution Roadmap */}
                <div className="!bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-8 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="w-8 h-8 text-violet-600" />
                        <h2 className="text-2xl font-bold text-foreground m-0">Ecosystem Evolution (2026+)</h2>
                    </div>
                    <p className="text-muted mb-6">
                        Strategic roadmap for evolving MIND from a specialized safety-critical tool into a broader standard for high-assurance AI.
                    </p>

                    {/* Phase Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-violet-600 uppercase">Q2 2026</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">Python Bridge Tooling</h4>
                            <p className="text-xs text-muted">PyTorch/JAX transpilers with auto-refinement suggestion. AI-assisted proof generation to resolve UNSAT errors.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Code className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-violet-600 uppercase">Q3 2026</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">Verified Model Zoo</h4>
                            <p className="text-xs text-muted">Certified neural network primitives with formal proofs. HuggingFace adapters with safety wrappers.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Layers className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-violet-600 uppercase">Q4 2026</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">Scalable Verification</h4>
                            <p className="text-xs text-muted">Tiered verification (L0-L3) with abstract interpretation. Incremental verification with proof caching.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Server className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-violet-600 uppercase">Q1 2027</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">Hardware & Cloud</h4>
                            <p className="text-xs text-muted">NVIDIA Blackwell, AMD MI400, Intel Gaudi 3. Verification-as-a-Service for complex proofs.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <FileCheck className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-violet-600 uppercase">Q2 2027</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">Regulatory Alignment</h4>
                            <p className="text-xs text-muted">Automated audit trails for ISO 26262, FDA 510(k), EU AI Act. Policy-as-Code enforcement.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 shadow-sm border-2 border-violet-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-violet-600 uppercase">Success Metrics</span>
                            </div>
                            <h4 className="font-bold text-sm mb-1">2027 Targets</h4>
                            <p className="text-xs text-muted">&lt;1 day to first verified model. &gt;10B params verification. 50+ certified layers. 100+ HF adapters.</p>
                        </div>
                    </div>

                    <p className="text-xs text-muted text-center">
                        Full details in the <a href="https://github.com/star-ga/mind-spec/blob/main/spec/v1.0/future-extensions.md#ecosystem-evolution-roadmap-2026" target="_blank" rel="noopener" className="text-violet-600 hover:underline">Ecosystem Evolution Roadmap</a> specification.
                    </p>
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
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-all hover:shadow-lg"
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
                            <a href="https://github.com/star-ga/mind/blob/main/docs/autodiff.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Autodiff design</a>
                            <a href="https://github.com/star-ga/mind/blob/main/docs/ir.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IR core</a>
                            <a href="https://github.com/star-ga/mind/blob/main/docs/mlir-lowering.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MLIR lowering pipeline</a>
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
