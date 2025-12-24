import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
    return (
        <footer className="bg-footer-bg border-t border-card-border mt-16 py-16">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Column - wider */}
                    <div className="flex flex-col gap-4 lg:col-span-5">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/img/mind-logo-grid-grey.svg"
                                alt="MIND Logo"
                                className="h-10 w-auto"
                            />
                            <span className="text-xl font-extrabold font-heading text-foreground">
                                MIND
                            </span>
                            <span className="text-muted">·</span>
                            <span className="text-sm font-medium text-muted">
                                Native Intelligence.
                            </span>
                        </Link>
                        <div className="text-sm text-muted leading-relaxed max-w-sm">
                            <p>
                                Community Edition licensed under Apache 2.0. Enterprise extensions and hosted "MIND Cloud" offerings are available under commercial terms from STARGA Inc.
                            </p>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <svg className="w-5 h-5 text-muted hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.605 9.605 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>
                            <a href={siteConfig.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord">
                                <svg className="w-5 h-5 text-muted hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1892.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.1023.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Project Column */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <h3 className="font-heading font-bold text-foreground text-xl">Project</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={siteConfig.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm !text-slate-600 hover:!text-primary transition-colors flex items-center gap-1"
                                >
                                    Core language <ArrowUpRight size={12} className="opacity-70" />
                                </a>
                            </li>
                            <li>
                                <Link href="/docs" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Language spec
                                </Link>
                            </li>
                            <li>
                                <Link href="/roadmap" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link href="/ecosystem" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Ecosystem
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community Column */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <h3 className="font-heading font-bold text-foreground text-xl">Community</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/community" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Community hub
                                </Link>
                            </li>
                            <li>
                                <a
                                    href={siteConfig.discord}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm !text-slate-600 hover:!text-primary transition-colors flex items-center gap-1"
                                >
                                    Discord <ArrowUpRight size={12} className="opacity-70" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <h3 className="font-heading font-bold text-foreground text-xl">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/enterprise" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Enterprise
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/security" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Security
                                </Link>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${siteConfig.contactEmail}`}
                                    className="text-sm !text-slate-600 hover:!text-primary transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <Link href="/legal" className="text-sm !text-slate-600 hover:!text-primary transition-colors">
                                    Legal
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 text-left text-sm text-muted">
                    <p>
                        © {new Date().getFullYear()} <a href="https://star.ga" target="_blank" rel="noopener noreferrer" className="!text-slate-600 hover:!text-primary transition-colors">STARGA, Inc.</a>
                        <span className="mx-2">·</span>
                        <Link href="/privacy" className="!text-slate-600 hover:!text-primary transition-colors">Privacy</Link>
                        <span className="mx-2">·</span>
                        <Link href="/terms" className="!text-slate-600 hover:!text-primary transition-colors">Terms</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
