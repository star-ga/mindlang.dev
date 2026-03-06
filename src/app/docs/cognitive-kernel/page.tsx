import { Metadata } from "next";
import Link from "next/link";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "MIND Cognitive Kernel",
    description: "Deterministic AI runtime with microkernel architecture — from compiler to cognition. Control, memory, and verification planes for auditable intelligence.",
};

export default function CognitiveKernelPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/cognitive-kernel" />
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/cognitive-kernel" />
                    <h1 className="page-title mt-4">MIND Cognitive Kernel</h1>

                    <div className="prose max-w-none">
                        <p className="text-lg text-muted mb-4">
                            Deterministic AI &mdash; from compiler to cognition.
                        </p>
                        <p className="text-muted mb-8">
                            The Cognitive Kernel is MIND&rsquo;s deterministic runtime architecture for executing AI workloads
                            with full auditability. It extends the compiler&rsquo;s guarantees (bit-identical builds, compile-time
                            shape safety) into a runtime that handles both native MIND models and external LLMs through
                            a unified, verifiable execution model.
                        </p>

                        {/* ── Intent Parser ── */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-primary/30 bg-primary/5">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">&theta;</div>
                                <span className="font-bold text-lg">Intent Parser (Mind)</span>
                            </div>
                        </div>
                        <div className="flex justify-center mb-8">
                            <svg width="12" height="32" viewBox="0 0 12 32" className="text-primary/40">
                                <path d="M6 0 L6 24 L2 20 M6 24 L10 20" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </div>

                        {/* ── Microkernel Architecture ── */}
                        <h2 className="text-2xl font-bold font-heading mt-8 mb-6" id="microkernel">Microkernel Architecture</h2>

                        <p className="text-muted mb-6">
                            The runtime is organized into three isolated planes, each with a single responsibility.
                            Planes communicate through typed message channels &mdash; no shared mutable state.
                        </p>

                        <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.02] p-6 mb-10">
                            <h3 className="text-sm font-bold text-center uppercase tracking-widest text-muted mb-8">
                                MIND Deterministic Runtime &mdash; Microkernel Architecture
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Control Plane */}
                                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <h4 className="font-bold text-emerald-800 uppercase text-xs tracking-wider">Control Plane</h4>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Execution State Machine</h5>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {["SENSE", "THINK", "ACT", "VERIFY", "LEARN"].map(s => (
                                                    <span key={s} className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">{s}</span>
                                                ))}
                                            </div>
                                            <p className="text-xs text-muted">
                                                Five-phase execution cycle. Every transition is logged and verifiable. No implicit state changes.
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Constraint Engine</h5>
                                            <p className="text-xs text-muted">
                                                Invariant enforcement across state transitions. Pre/post-conditions checked at every phase boundary.
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Saga Coordinator</h5>
                                            <p className="text-xs text-muted">
                                                Compensating transactions on ACT failure. If a side effect cannot complete, the runtime rolls back to the last verified state.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Memory Plane */}
                                <div className="rounded-xl border border-blue-200 bg-white p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                        <h4 className="font-bold text-blue-800 uppercase text-xs tracking-wider">Memory Plane</h4>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Versioned Memory Controller</h5>
                                            <p className="text-xs text-muted">
                                                Versioned, scored, bounded memory. Zero drift &mdash; every memory state is immutable once committed.
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Snapshot Manager</h5>
                                            <p className="text-xs text-muted">
                                                Immutable snapshots on LEARN transitions. Each new version creates a lineage link to its predecessor.
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Context Optimizer</h5>
                                            <p className="text-xs text-muted">
                                                Token-aware, deterministic context assembly. Selects and ranks context for optimal inference within bounded windows.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Verification Plane */}
                                <div className="rounded-xl border border-amber-200 bg-white p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                                        <h4 className="font-bold text-amber-800 uppercase text-xs tracking-wider">Verification Plane</h4>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Verification Layer</h5>
                                            <p className="text-xs text-muted">
                                                Accepts/rejects constraint checks on all outputs. No output leaves the runtime without passing verification.
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Audit Logger</h5>
                                            <p className="text-xs text-muted">
                                                SHA-256 hash chain of every decision. Tamper-evident log that proves the execution trace is unmodified.
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="font-bold text-sm mb-1">Replay Engine</h5>
                                            <p className="text-xs text-muted">
                                                Deterministic re-execution or cached replay. Given the same inputs and snapshot, produces bit-identical output.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Execution Profiles ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="profiles">Execution Profiles</h2>

                        <p className="text-muted mb-6">
                            The microkernel supports three execution profiles that trade latency for assurance level.
                            All profiles produce deterministic output &mdash; the difference is how much verification runs inline vs deferred.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="p-5 rounded-lg border border-card-border">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">LIGHTWEIGHT</span>
                                </div>
                                <p className="text-sm text-muted">
                                    Deferred verification. Outputs cached, constraints checked asynchronously.
                                    Lowest latency for development and non-critical inference.
                                </p>
                            </div>
                            <div className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">GUARDED</span>
                                </div>
                                <p className="text-sm text-muted">
                                    Inline verification on ACT transitions. Outputs verified before side effects execute.
                                    Default profile for production workloads.
                                </p>
                            </div>
                            <div className="p-5 rounded-lg border border-amber-300 bg-amber-50">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">HIGH-ASSURANCE</span>
                                </div>
                                <p className="text-sm text-muted">
                                    Full constraint checking at every state transition. SHA-256 hash chain on every decision.
                                    Required for safety-critical deployments (FDA, ISO 26262, BCI).
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="p-4 rounded-lg border border-card-border bg-card-background">
                                <h5 className="font-bold text-sm mb-2">Execution Modes</h5>
                                <p className="text-xs text-muted">
                                    Configurable per-deployment. Switch between profiles without recompilation &mdash; the binary is the same,
                                    only the runtime verification depth changes.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg border border-card-border bg-card-background">
                                <h5 className="font-bold text-sm mb-2">Cognition Cache</h5>
                                <p className="text-xs text-muted">
                                    Outputs stored, keyed by intent and context. Identical queries return cached results
                                    without re-execution &mdash; determinism makes this safe.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg border border-card-border bg-card-background">
                                <h5 className="font-bold text-sm mb-2">Snapshot Lineage</h5>
                                <p className="text-xs text-muted">
                                    LEARN transitions create new memory versions. Full lineage graph enables replay across
                                    any historical state for audit or debugging.
                                </p>
                            </div>
                        </div>

                        {/* ── Compiler Stack ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="compiler-stack">Compiler Stack &mdash; Deterministic by Design</h2>

                        <p className="text-muted mb-6">
                            The Cognitive Kernel builds on MIND&rsquo;s deterministic compiler. 100% bit-identical builds,
                            SHA-256 verified. Compile-time autodiff. Deterministic memory management.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-2 p-6 rounded-xl border-2 border-primary/20 bg-primary/[0.02] mb-10">
                            {[
                                { label: "MIND Source", color: "bg-primary text-white" },
                                { label: "Custom MLIR Dialect", color: "bg-primary/80 text-white" },
                                { label: "LLVM IR", color: "bg-primary/60 text-white" },
                                { label: "Deterministic Binary", color: "bg-primary/40 text-white font-bold" },
                            ].map((stage, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${stage.color}`}>{stage.label}</span>
                                    {i < 3 && (
                                        <svg width="16" height="12" viewBox="0 0 16 12" className="text-primary/30">
                                            <path d="M0 6 L12 6 M8 2 L12 6 L8 10" stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* ── Dual-Path Inference ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="dual-path">Inference Subsystem &mdash; Dual-Path Execution</h2>

                        <p className="text-muted mb-6">
                            The Cognitive Kernel handles two fundamentally different kinds of models through a unified
                            verification framework. Native MIND models execute deterministically. External LLMs execute
                            stochastically but are sandboxed, cached, and verified before side effects.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-xl border border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-3">MIND-Native Models</h4>
                                <ul className="list text-sm space-y-2">
                                    <li>Compiled via MLIR &rarr; LLVM to deterministic binaries</li>
                                    <li>Bit-identical execution, SHA-256 verified</li>
                                    <li>Compile-time autodiff &mdash; no runtime tape</li>
                                    <li>Deterministic memory &mdash; no GC, no drift</li>
                                </ul>
                                <div className="mt-4">
                                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200">
                                        TRUE DETERMINISTIC EXECUTION
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl border border-card-border">
                                <h4 className="font-bold text-muted mb-3">External LLMs (GPT / Claude / Llama)</h4>
                                <ul className="list text-sm space-y-2">
                                    <li>Stochastic coprocessor &mdash; sandboxed tool access</li>
                                    <li>Output cached and event-sourced on first call</li>
                                    <li>Replay from cache &mdash; cognition recorded, not recomputed</li>
                                    <li>Every output verified before side effects execute</li>
                                </ul>
                                <div className="mt-4">
                                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-100 text-blue-700 border border-blue-200">
                                        AUDITABLE REPLAY TRACE
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted mb-4">
                            The key insight: external LLMs are treated as <strong>stochastic coprocessors</strong>, not trusted execution engines.
                            Their outputs are event-sourced (recorded on first call) and replayed from cache on subsequent calls.
                            This means an audit trail can prove exactly what the LLM produced, when, and what the system did with it.
                        </p>

                        <p className="text-muted mb-10">
                            The &ldquo;or&rdquo; between paths is a deployment choice. Safety-critical systems use MIND-native models exclusively.
                            Agent systems that need LLM reasoning use the external path with full verification guardrails.
                        </p>

                        {/* ── Comparison ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="comparison">Standard LLM Stack vs MIND Cognitive Kernel</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="p-5 rounded-xl border-2 border-red-200 bg-red-50/50">
                                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                                    <span className="text-red-400">&times;</span> Standard LLM Stack
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                        <span className="text-muted">Stochastic execution &mdash; no reproducibility</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                        <span className="text-muted">Unbounded, drifting context memory</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                        <span className="text-muted">Runtime shape errors crash production</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                        <span className="text-muted">No compensation on failure</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                        <span className="text-muted">Cannot certify or audit model provenance</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
                                <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                                    <span className="text-primary">&#9675;</span> MIND Cognitive Kernel
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>Deterministic native execution + auditable external replay</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>Versioned, scored, bounded memory snapshots</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>Compile-time tensor safety &mdash; shape errors impossible</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>Saga-based rollback on failure</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>SHA-256 verified builds for model certification</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* ── Core Equation ── */}
                        <div className="p-6 rounded-xl bg-slate-50 border border-card-border text-center mb-10">
                            <p className="font-mono text-lg font-bold text-foreground">
                                same source + same snapshot = bit-identical, certified execution
                            </p>
                        </div>

                        {/* ── How It Works ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="execution-flow">Execution Flow</h2>

                        <p className="text-muted mb-6">
                            A request through the Cognitive Kernel follows a strict five-phase cycle.
                            Each phase transition is gated by the Constraint Engine and logged by the Audit Logger.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                {
                                    phase: "SENSE",
                                    desc: "Intent Parser receives input. Classifies intent, extracts parameters, validates against schema. Input is immutable once parsed.",
                                    color: "border-l-emerald-500 bg-emerald-50/50",
                                },
                                {
                                    phase: "THINK",
                                    desc: "Context Optimizer assembles relevant state from versioned memory. For native models, loads compiled binary. For external LLMs, constructs prompt with bounded context.",
                                    color: "border-l-blue-500 bg-blue-50/50",
                                },
                                {
                                    phase: "ACT",
                                    desc: "Execution. Native models run deterministically. External LLMs called through sandboxed coprocessor. Output captured and event-sourced. Saga Coordinator manages compensation if ACT fails.",
                                    color: "border-l-indigo-500 bg-indigo-50/50",
                                },
                                {
                                    phase: "VERIFY",
                                    desc: "Verification Layer checks output against constraints. Audit Logger records SHA-256 hash. If verification fails, output is rejected and Saga Coordinator compensates.",
                                    color: "border-l-amber-500 bg-amber-50/50",
                                },
                                {
                                    phase: "LEARN",
                                    desc: "Snapshot Manager creates new memory version. Lineage link recorded. Cognition Cache updated. State is now immutable — next cycle starts from this snapshot.",
                                    color: "border-l-purple-500 bg-purple-50/50",
                                },
                            ].map((item) => (
                                <div key={item.phase} className={`p-4 rounded-lg border-l-4 ${item.color}`}>
                                    <h5 className="font-bold text-sm mb-1">{item.phase}</h5>
                                    <p className="text-sm text-muted">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* ── Integration with mind-mem ── */}
                        <h2 className="text-2xl font-bold font-heading mt-16 mb-6" id="memory">Memory Integration</h2>

                        <p className="text-muted mb-6">
                            The Memory Plane is powered by <a href="https://github.com/star-ga/mind-mem" className="text-primary hover:underline">mind-mem</a>,
                            MIND&rsquo;s persistent memory system. mind-mem provides the versioned, contradiction-safe storage
                            that the Cognitive Kernel requires for deterministic replay:
                        </p>

                        <ul className="list mb-8">
                            <li><strong>Hybrid retrieval:</strong> BM25 + vector + RRF fusion for context assembly</li>
                            <li><strong>MIND scoring kernels:</strong> Compiled tensor operations for ranking, reranking, and abstention</li>
                            <li><strong>Audit chain:</strong> Cryptographic hash chain for every memory mutation</li>
                            <li><strong>Causal graph:</strong> Tracks dependencies between memory blocks for staleness propagation</li>
                            <li><strong>Drift detection:</strong> Identifies when stored knowledge diverges from source of truth</li>
                        </ul>

                        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mb-10 text-sm">
                            <strong className="text-blue-800">Commercial feature:</strong>{" "}
                            <span className="text-blue-700">
                                The full Cognitive Kernel runtime (execution profiles, saga coordination, cognition cache,
                                high-assurance mode) is part of the commercial <Link href="/enterprise" className="text-primary hover:underline">mind-runtime</Link>.
                                The compiler, mind-mem, and MIND scoring kernels are Apache 2.0 open source.
                            </span>
                        </div>

                        {/* ── CTA ── */}
                        <div className="mt-16 p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold font-heading mb-4 !text-white">Explore the Architecture</h2>
                                <p className="!text-slate-300 mb-6 max-w-2xl">
                                    See how the Cognitive Kernel builds on MIND&rsquo;s compiler guarantees, or contact us
                                    to discuss deployment for your use case.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/docs/architecture" className="btn btn--primary">
                                        Compiler Architecture
                                    </Link>
                                    <Link href="/docs/runtime" className="btn btn--ghost !text-white !border-white/30 hover:!bg-white/10">
                                        Runtime Docs
                                    </Link>
                                    <Link href="/compliance" className="btn btn--ghost !text-white !border-white/30 hover:!bg-white/10">
                                        Compliance Toolkit
                                    </Link>
                                    <Link href="/pilot" className="btn btn--ghost !text-white !border-white/30 hover:!bg-white/10">
                                        Start a Pilot
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        </div>
                    </div>

                    <PageNavigation
                        prev={{ label: "Architecture Deep Dive", href: "/docs/architecture" }}
                        next={{ label: "Runtime", href: "/docs/runtime" }}
                    />
                </main>
            </div>
        </div>
    );
}
