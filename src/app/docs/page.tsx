import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";
import { Box, ShieldCheck, Zap, Cpu, BookOpen, MessageCircle, Github, FileText, Cloud, Rocket } from "lucide-react";

export const metadata: Metadata = {
    title: "Documentation",
    description: "MIND language documentation - learn about tensor-native types, automatic differentiation, and the MLIR compiler pipeline.",
};

export default function DocsPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs" />
                    <h1 className="page-title mt-4">MIND Language Documentation</h1>

                    <div className="prose max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Welcome to the MIND documentation. MIND is a tensor-native, Rust-inspired language and compiler that unifies modeling, compilation, and deployment of intelligent systems.
                        </p>

                        <div className="grid grid--two gap-6 mb-12">
                            <Link href="/docs/quick-start" className="card card--outline group !bg-footer-bg">
                                <h3 className="group-hover:text-primary transition-colors">Quick Start →</h3>
                                <p className="text-sm text-muted mt-2">
                                    Get up and running with MIND in minutes. Write your first tensor computation.
                                </p>
                            </Link>

                            <Link href="/docs/installation" className="card card--outline group !bg-footer-bg">
                                <h3 className="group-hover:text-primary transition-colors">Installation →</h3>
                                <p className="text-sm text-muted mt-2">
                                    Install the MIND compiler and runtime on your system.
                                </p>
                            </Link>

                            <Link href="/docs/shapes" className="card card--outline group !bg-footer-bg">
                                <h3 className="group-hover:text-primary transition-colors">Shapes & Broadcasting →</h3>
                                <p className="text-sm text-muted mt-2">
                                    Learn how MIND handles tensor shapes and broadcasting semantics.
                                </p>
                            </Link>

                            <a
                                href={siteConfig.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card card--outline group !bg-footer-bg"
                            >
                                <h3 className="group-hover:text-primary transition-colors">Source Code →</h3>
                                <p className="text-sm text-muted mt-2">
                                    Browse the MIND compiler source code on GitHub.
                                </p>
                            </a>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-16 mb-8">Core Concepts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                            <div className="p-6 rounded-xl border border-card-border bg-card-background dark:bg-card-background">
                                <Box className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold mb-2">Tensor-native types</h3>
                                <p className="text-sm text-muted">
                                    Tensors are first-class citizens with shapes and dtypes encoded in the type system, enabling powerful compile-time guarantees.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-card-border bg-card-background dark:bg-card-background">
                                <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold mb-2">Static shape checking</h3>
                                <p className="text-sm text-muted">
                                    Shape mismatches are caught at compile time, not runtime, preventing a whole class of common deep learning errors.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-card-border bg-card-background dark:bg-card-background">
                                <Zap className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold mb-2">Built-in autodiff</h3>
                                <p className="text-sm text-muted">
                                    Automatic differentiation is a first-class language feature, not an add-on library, allowing for efficient gradient computation.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border border-card-border bg-card-background dark:bg-card-background">
                                <Cpu className="w-8 h-8 text-primary mb-4" />
                                <h3 className="font-bold mb-2">MLIR + LLVM</h3>
                                <p className="text-sm text-muted">
                                    The compiler leverages MLIR for high-level tensor optimizations and LLVM for highly efficient machine code generation.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-16 mb-8">Full-Stack AI</h2>
                        <p className="text-muted mb-6">
                            MIND is evolving into a complete platform for building, deploying, and scaling AI systems.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                            <Link href="/docs/distributed" className="p-6 rounded-xl border border-card-border hover:border-primary transition-colors group">
                                <Cloud className="w-8 h-8 text-indigo-600 mb-4" />
                                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Distributed Execution</h3>
                                <p className="text-sm text-muted">
                                    Scale models across clusters with data parallelism, model parallelism, and automatic gradient synchronization.
                                </p>
                            </Link>
                            <Link href="/docs/deployment" className="p-6 rounded-xl border border-card-border hover:border-primary transition-colors group">
                                <Rocket className="w-8 h-8 text-orange-600 mb-4" />
                                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">Deployment</h3>
                                <p className="text-sm text-muted">
                                    Deploy to cloud, edge, or on-premise with one command. Built-in serving, auto-scaling, and monitoring.
                                </p>
                            </Link>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-900 text-white mb-16 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText className="w-6 h-6 !text-white" />
                                    <h2 className="text-2xl font-bold font-heading m-0 !text-white">Language Specification</h2>
                                </div>
                                <p className="!text-white mb-6 max-w-2xl">
                                    The formal language specification is the authoritative source for MIND syntax and semantics. It is automatically synced from the mind-spec repository.
                                </p>
                                <a
                                    href={siteConfig.specRepo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--primary inline-flex items-center"
                                >
                                    Browse Specification
                                </a>
                            </div>
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        </div>

                        <h2 className="text-2xl font-bold font-heading mb-8">Getting Help</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href="/docs/cookbook" className="p-6 rounded-xl border border-card-border hover:border-primary transition-colors group">
                                <BookOpen className="w-8 h-8 text-muted group-hover:text-primary transition-colors mb-4" />
                                <h3 className="font-bold mb-2">Cookbook</h3>
                                <p className="text-sm text-muted">View common patterns, examples, and solutions.</p>
                            </Link>
                            <a href={siteConfig.discord} target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-card-border hover:border-primary transition-colors group">
                                <MessageCircle className="w-8 h-8 text-muted group-hover:text-primary transition-colors mb-4" />
                                <h3 className="font-bold mb-2">Discord Community</h3>
                                <p className="text-sm text-muted">Chat with the team and other developers.</p>
                            </a>
                            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-card-border hover:border-primary transition-colors group">
                                <Github className="w-8 h-8 text-muted group-hover:text-primary transition-colors mb-4" />
                                <h3 className="font-bold mb-2">GitHub Issues</h3>
                                <p className="text-sm text-muted">Report bugs or request new features.</p>
                            </a>
                        </div>
                    </div>

                    <PageNavigation
                        next={{ label: "Quick Start", href: "/docs/quick-start" }}
                    />

                </main>
            </div>
        </div>
    );
}
