import { Metadata } from "next";
import Link from "next/link";
import { Github, MessageCircle, Mail, Search, Heart } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
    title: "Community",
    description: "Connect with MIND developers, report security issues, and help shape the future of the language.",
};

export default function CommunityPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section" style={{ marginTop: "1.25rem" }}>
                <div className="container">
                    <div className="w-full overflow-hidden rounded-xl mb-8 shadow-lg">
                        <img
                            src="/img/features/community.jpg"
                            alt="Community Banner"
                            className="w-full block object-cover"
                            style={{ height: "16vw", minHeight: "160px", maxHeight: "320px" }}
                        />
                    </div>

                    <h1 className="page-title">Community</h1>
                    <p className="text-lg text-muted mb-8">
                        MIND is developed in the open. We welcome contributions, questions, and ideas from developers everywhere.
                    </p>
                </div>
            </section>

            <div className="container pb-16">
                <div className="grid grid--three">
                    {/* GitHub */}
                    <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                        <Github className="card-icon mx-auto !w-20 !h-20" style={{ color: "#4f46e5" }} />
                        <h3>GitHub</h3>
                        <p className="flex-1 flex items-center justify-center">
                            The complete MIND compiler and runtime, along with documentation and RFC process, lives on GitHub.
                        </p>
                        <a href={siteConfig.github} className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-4" target="_blank" rel="noopener noreferrer">
                            View on GitHub
                        </a>
                    </div>

                    {/* Discord */}
                    <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                        <MessageCircle className="card-icon mx-auto !w-20 !h-20" style={{ color: "#4f46e5" }} />
                        <h3>Discord</h3>
                        <p className="flex-1 flex items-center justify-center">
                            Join our Discord server to chat with other MIND developers, share ideas, and get help.
                        </p>
                        <a href={siteConfig.discord} className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-4" target="_blank" rel="noopener noreferrer">
                            Join Discord
                        </a>
                    </div>

                    {/* Discussions & RFCs */}
                    <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                        <MessageCircle className="card-icon mx-auto !w-20 !h-20" style={{ color: "#4f46e5" }} />
                        <h3>Discussions & RFCs</h3>
                        <p className="flex-1 flex items-center justify-center">
                            Major proposals go through our RFC process to ensure thoughtful design.
                        </p>
                        <a href={`${siteConfig.github}/discussions`} className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-4" target="_blank" rel="noopener noreferrer">
                            GitHub Discussions
                        </a>
                    </div>

                    {/* Email */}
                    <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                        <Mail className="card-icon mx-auto !w-20 !h-20" style={{ color: "#4f46e5" }} />
                        <h3>Email</h3>
                        <p className="flex-1 flex items-center justify-center">Questions about the project? Reach out to the team directly.</p>
                        <a href={`mailto:${siteConfig.contactEmail}`} className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-4">
                            Email Us
                        </a>
                    </div>

                    {/* Discover Ideas */}
                    <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                        <Search className="card-icon mx-auto !w-20 !h-20" style={{ color: "#4f46e5" }} />
                        <h3>Discover Ideas</h3>
                        <p className="flex-1 flex items-center justify-center">Explore our project roadmap and find issues that match your interests.</p>
                        <Link href="/roadmap" className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-4">
                            View Roadmap
                        </Link>
                    </div>

                    {/* Make Impact */}
                    <div className="card card--outline flex flex-col items-center text-center" style={{ backgroundColor: "var(--footer-background)" }}>
                        <Heart className="card-icon mx-auto !w-20 !h-20" style={{ color: "#4f46e5" }} />
                        <h3>Make Impact</h3>
                        <p className="flex-1 flex items-center justify-center">See your code help thousands of users and make a real difference.</p>
                        <Link href="/showcase" className="btn bg-white text-primary shadow-sm hover:bg-gray-50 mt-4">
                            View Showcase
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full my-16">
                    <hr className="border-t border-card-border" />
                </div>

                {/* Cards Section */}
                <div className="grid grid--two gap-8">
                    {/* Code of Conduct */}
                    <div className="card card--outline overflow-hidden p-0">
                        <img
                            src="/img/community/code_of_conduct.jpeg"
                            alt="Code of Conduct"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <div className="p-6">
                            <h3>Code of conduct</h3>
                            <p className="text-muted mt-2">
                                The MIND project is committed to providing a welcoming, inclusive, and harassment-free experience for all contributors and community members.
                            </p>
                            <a
                                href="https://github.com/star-ga/mind/blob/main/CODE_OF_CONDUCT.md"
                                className="btn btn--primary mt-4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read the full code of conduct
                            </a>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="card card--outline overflow-hidden p-0">
                        <img
                            src="/img/community/security.jpeg"
                            alt="Security"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <div className="p-6">
                            <h3>Security</h3>
                            <p className="text-muted mt-2">
                                If you discover a security vulnerability, please report it responsibly according to our security policy rather than opening a public issue.
                            </p>
                            <a
                                href="https://github.com/star-ga/mind/blob/main/SECURITY.md"
                                className="btn btn--primary mt-4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View security policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
