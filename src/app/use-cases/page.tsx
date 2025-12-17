import { Metadata } from "next";
import { Share2, Timer, TrendingUp } from "lucide-react";
import { Slideshow } from "./Slideshow";

export const metadata: Metadata = {
    title: "Use Cases",
    description: "Where Mind shines - from edge devices to high-frequency trading.",
};

export default function UseCasesPage() {
    return (
        <div className="pb-20">
            {/* Hero Banner */}
            <section className="section" style={{ marginTop: "1.25rem" }}>
                <div className="container">
                    <div className="w-full overflow-hidden rounded-xl mb-8 shadow-lg bg-gray-200">
                        <img
                            src="/img/features/use-cases.jpg"
                            alt="MIND Use Cases Overview"
                            className="w-full block object-cover"
                            style={{ height: "16vw", minHeight: "160px", maxHeight: "320px" }}
                        />
                    </div>
                    <div className="mb-16">
                        <h1 className="text-4xl font-bold text-foreground mb-4 font-heading">Use Cases</h1>
                        <p className="text-lg text-muted">
                            From bare-metal embedded devices to massive cloud deployments, MIND scales with your needs.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {/* Card 1: Edge Computing */}
                    <div className="card flex flex-col items-center text-center p-8 border border-card-border rounded-xl shadow-sm hover:shadow-md transition-all" style={{ backgroundColor: "var(--footer-background)" }}>
                        <div className="w-16 h-16 mb-6 text-primary flex items-center justify-center bg-blue-50 rounded-full">
                            <Share2 size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 font-heading min-h-[3.5rem] flex items-center justify-center">Edge Computing</h3>
                        <p className="text-muted leading-relaxed mb-6 min-h-[4.5rem]">
                            Deploy complex logic to resource-constrained devices without sacrificing safety or performance.
                        </p>
                        <ul className="list w-full space-y-2 text-sm text-foreground text-left">
                            <li>
                                Zero-cost abstractions
                            </li>
                            <li>
                                Minimal runtime footprint
                            </li>
                            <li>
                                Direct hardware access
                            </li>
                        </ul>
                    </div>

                    {/* Card 2: Real-time Systems */}
                    <div className="card flex flex-col items-center text-center p-8 border border-card-border rounded-xl shadow-sm hover:shadow-md transition-all" style={{ backgroundColor: "var(--footer-background)" }}>
                        <div className="w-16 h-16 mb-6 text-primary flex items-center justify-center bg-blue-50 rounded-full">
                            <Timer size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 font-heading min-h-[3.5rem] flex items-center justify-center">Real-time Systems</h3>
                        <p className="text-muted leading-relaxed mb-6 min-h-[4.5rem]">
                            Predictable execution times and strict memory guarantees for mission-critical control loops.
                        </p>
                        <ul className="list w-full space-y-2 text-sm text-foreground text-left">
                            <li>
                                Deterministic memory management
                            </li>
                            <li>
                                No garbage collection pauses
                            </li>
                            <li>
                                Compile-time resource verification
                            </li>
                        </ul>
                    </div>

                    {/* Card 3: Quantitative Finance */}
                    <div className="card flex flex-col items-center text-center p-8 border border-card-border rounded-xl shadow-sm hover:shadow-md transition-all" style={{ backgroundColor: "var(--footer-background)" }}>
                        <div className="w-16 h-16 mb-6 text-primary flex items-center justify-center bg-blue-50 rounded-full">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 font-heading min-h-[3.5rem] flex items-center justify-center">Quantitative Finance</h3>
                        <p className="text-muted leading-relaxed mb-6 min-h-[4.5rem]">
                            Execute complex trading strategies with the lowest possible latency and highest reliability.
                        </p>
                        <ul className="list w-full space-y-2 text-sm text-foreground text-left">
                            <li>
                                Microsecond-level latency
                            </li>
                            <li>
                                Safe concurrency models
                            </li>
                            <li>
                                Mathematical correctness proofs
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-20">
                    {/* Feature Row 1: Embedded Systems */}
                    <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4 font-heading">Embedded Systems</h2>
                            <p className="text-lg text-muted mb-6">
                                Mind brings modern language features to bare-metal development, making embedded programming safer and more productive.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <div>
                                        <strong className="text-foreground">Memory Safety without GC:</strong>
                                        <span className="text-muted block mt-1">Prevent buffer overflows and null pointer dereferences at compile time.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <div>
                                        <strong className="text-foreground">Hardware Abstraction:</strong>
                                        <span className="text-muted block mt-1">Write reusable drivers with zero runtime overhead using Mind's powerful type system.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <div>
                                        <strong className="text-foreground">Cross-Compilation:</strong>
                                        <span className="text-muted block mt-1">First-class support for ARM, RISC-V, and AVR architectures out of the box.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <Slideshow />
                        </div>
                    </div>

                    {/* Feature Row 2: Cloud Infrastructure */}
                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <div className="w-full md:w-1/2">
                            <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-xl border border-slate-200 bg-[#E6E9F2]">
                                <img
                                    src="/img/features/case_cloud.jpeg"
                                    alt="Cloud Concurrency"
                                    className="w-full h-full object-cover block scale-[1.02]"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4 font-heading">Cloud Infrastructure</h2>
                            <p className="text-lg text-muted mb-6">
                                Build robust, scalable network services that can handle millions of concurrent connections with ease.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <div>
                                        <strong className="text-foreground">Async/Await:</strong>
                                        <span className="text-muted block mt-1">Native support for asynchronous I/O with a highly efficient work-stealing scheduler.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <div>
                                        <strong className="text-foreground">Fearless Concurrency:</strong>
                                        <span className="text-muted block mt-1">The ownership model ensures thread safety without the need for complex locking mechanisms.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <div>
                                        <strong className="text-foreground">Binary Portability:</strong>
                                        <span className="text-muted block mt-1">Compile once and deploy single static binaries to any Linux distribution or container.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
