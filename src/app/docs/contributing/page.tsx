import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Contributing",
    description: "Guidelines for contributing to the MIND compiler and toolchain.",
};

export default function ContributingPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/contributing" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/contributing" />
                    <h1 className="page-title mt-4">Contributing</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            Guidelines for contributing to the MIND compiler, runtime, and toolchain.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Development Setup</h2>
                        <p className="text-muted mb-4">
                            Clone the repository and ensure you have the required toolchain:
                        </p>
                        <CodeBlock className="mb-4">{`git clone https://github.com/cputer/mind.git
cd mind
rustup update stable
cargo build --all`}</CodeBlock>
                        <p className="text-muted mb-8">
                            The project requires <strong>stable Rust</strong>. Nightly features are not used.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Code Formatting</h2>
                        <p className="text-muted mb-4">
                            All code must be formatted using the default stable rustfmt configuration. Run formatting before committing:
                        </p>
                        <CodeBlock className="mb-4">{`cargo fmt --all`}</CodeBlock>
                        <p className="text-muted mb-4">
                            The project uses only stable rustfmt options. Deprecated or nightly-only options like <code>wrap_comments</code> are not used. The default <code>rustfmt.toml</code> configuration (if present) contains only stable options compatible with the current Rust stable toolchain.
                        </p>
                        <p className="text-muted mb-8">
                            CI will fail if code is not properly formatted. Always run <code>cargo fmt --all</code> before pushing.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Security Auditing with cargo-deny</h2>
                        <p className="text-muted mb-4">
                            The project uses <a href="https://github.com/EmbarkStudios/cargo-deny" target="_blank" rel="noopener" className="text-primary hover:underline">cargo-deny</a> to audit dependencies for security vulnerabilities and license compliance:
                        </p>
                        <CodeBlock className="mb-4">{`cargo deny check`}</CodeBlock>

                        <h3 className="text-lg font-bold mt-6 mb-3">Handling CVSS v4 Advisories</h3>
                        <p className="text-muted mb-4">
                            Some security advisories use CVSS v4 scoring, which older versions of cargo-deny do not fully support. If you encounter errors like:
                        </p>
                        <CodeBlock className="mb-4">{`error: advisory uses unsupported CVSS v4 format`}</CodeBlock>
                        <p className="text-muted mb-4">
                            There are two approaches to resolve this:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-4">
                            <li><strong>Update cargo-deny</strong> to a version that supports CVSS v4 (0.14.3 or later)</li>
                            <li><strong>Use the sanitize script</strong> if available in the repository, which preprocesses the advisory database to remove unsupported CVSS v4 entries</li>
                        </ul>
                        <p className="text-muted mb-8">
                            Check the repository&apos;s <code>scripts/</code> directory or CI configuration for the current recommended approach.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Running Tests</h2>
                        <p className="text-muted mb-4">
                            Run the full test suite before submitting changes:
                        </p>
                        <CodeBlock className="mb-4">{`cargo test --all`}</CodeBlock>
                        <p className="text-muted mb-4">
                            For conformance testing against the specification:
                        </p>
                        <CodeBlock className="mb-8">{`cargo run --bin mindc -- conformance --profile cpu`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Pull Request Guidelines</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Ensure all tests pass: <code>cargo test --all</code></li>
                            <li>Ensure code is formatted: <code>cargo fmt --all</code></li>
                            <li>Ensure no clippy warnings: <code>cargo clippy --all -- -D warnings</code></li>
                            <li>Ensure dependencies pass audit: <code>cargo deny check</code></li>
                            <li>Write clear commit messages describing the change</li>
                            <li>Reference any related issues in the PR description</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Project Structure</h2>
                        <p className="text-muted mb-4">
                            The MIND ecosystem spans multiple repositories:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><a href="https://github.com/cputer/mind" target="_blank" rel="noopener" className="text-primary hover:underline">cputer/mind</a> — Compiler and CLI (<code>mindc</code>)</li>
                            <li><a href="https://github.com/cputer/mind-spec" target="_blank" rel="noopener" className="text-primary hover:underline">cputer/mind-spec</a> — Language specification (normative)</li>
                            <li><a href="https://github.com/cputer/mind-runtime" target="_blank" rel="noopener" className="text-primary hover:underline">cputer/mind-runtime</a> — CPU and GPU runtime implementations</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Getting Help</h2>
                        <p className="text-muted">
                            If you have questions about contributing, open a discussion on the{" "}
                            <a href="https://github.com/cputer/mind/discussions" target="_blank" rel="noopener" className="text-primary hover:underline">
                                GitHub Discussions
                            </a>{" "}
                            page or check existing issues for guidance.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Future Extensions", href: "/docs/future" }}
                    />

                </main>
            </div>
        </div>
    );
}
