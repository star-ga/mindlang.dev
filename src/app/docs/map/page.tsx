import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Mind AI Protocol (MAP)",
    description: "Line-oriented protocol for AI agents to interact with MIND tooling.",
};

export default function MAPPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/map" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Mind AI Protocol (MAP)</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MAP is a line-oriented protocol designed for AI agents to interact with MIND tooling. It enables agents to compile, patch, query, and validate IR modules via a simple request-response pattern.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Design Principles</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Line-oriented:</strong> Each request/response is a single line (with optional heredoc for large payloads)</li>
                            <li><strong>Sequence numbers:</strong> Every request has a sequence number for reliable correlation</li>
                            <li><strong>Token-efficient:</strong> Minimal syntax overhead for AI agent contexts</li>
                            <li><strong>Stateful sessions:</strong> Server maintains module state between requests</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Protocol Format</h2>
                        <CodeBlock className="mb-8">{`# Request format
@<seq> <command> [args...]

# Response format (success)
=<seq> ok [data...]

# Response format (error)
=<seq> err msg="<error message>"`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Commands</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Command</th>
                                        <th className="text-left py-2 pr-4 font-bold">Description</th>
                                        <th className="text-left py-2 font-bold">Example</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">hello</td>
                                        <td className="py-2 pr-4">Establish session, negotiate versions</td>
                                        <td className="py-2 font-mono">@1 hello mic=1 map=1</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">load</td>
                                        <td className="py-2 pr-4">Load MIC module into session</td>
                                        <td className="py-2 font-mono">@2 load &lt;&lt;EOF...EOF</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">patch</td>
                                        <td className="py-2 pr-4">Insert/modify nodes in module</td>
                                        <td className="py-2 font-mono">@3 patch after=N5 N6 relu N5 T0</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">check</td>
                                        <td className="py-2 pr-4">Validate current module</td>
                                        <td className="py-2 font-mono">@4 check</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">dump</td>
                                        <td className="py-2 pr-4">Export current module as MIC</td>
                                        <td className="py-2 font-mono">@5 dump</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">query</td>
                                        <td className="py-2 pr-4">Query node information</td>
                                        <td className="py-2 font-mono">@6 query N5</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">bye</td>
                                        <td className="py-2 pr-4">Close session</td>
                                        <td className="py-2 font-mono">@7 bye</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example Session</h2>
                        <CodeBlock className="mb-8">{`# Client establishes connection
@1 hello mic=1 map=1

# Server responds with capabilities
=1 ok version=1.0.0 mic=1 map=1 features=[patch,check,dump,query]

# Client loads a module
@2 load <<EOF
mic@1
T0 f32
N0 const.f32 1.0 T0
N1 const.f32 2.0 T0
N2 add N0 N1 T0
O N2
EOF

=2 ok nodes=3

# Client patches the module
@3 patch after=N2 N3 mul N2 N2 T0

=3 ok

# Client validates the module
@4 check

=4 ok valid=true nodes=4

# Client exports the module
@5 dump

=5 ok <<EOF
mic@1
T0 f32
N0 const.f32 1.0 T0
N1 const.f32 2.0 T0
N2 add N0 N1 T0
N3 mul N2 N2 T0
O N3
EOF

# Client closes session
@6 bye

=6 ok`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Session Modes</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Mode</th>
                                        <th className="text-left py-2 font-bold">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">strict</td>
                                        <td className="py-2">All operations validated immediately</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">lenient</td>
                                        <td className="py-2">Allow partial modules, validate on check</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Error Codes</h2>
                        <CodeBlock className="mb-8">{`# Version mismatch
=1 err msg="version mismatch: server supports mic=1 map=1"

# Parse error
=2 err msg="parse error at line 3: unknown opcode 'foo'"

# Invalid reference
=3 err msg="invalid reference: N99 not defined"

# Validation error
=4 err msg="type mismatch: expected f32, got i64"`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Running the MAP Server</h2>
                        <CodeBlock className="mb-8">{`# Start MAP server on stdio
mind-ai

# Start MAP server on TCP port
mind-ai --tcp 9999

# Connect with netcat
nc localhost 9999`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Integration with AI Agents</h2>
                        <p className="text-muted mb-4">
                            MAP is designed for integration with AI code assistants. The protocol enables agents to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Incrementally build neural network architectures</li>
                            <li>Validate changes before committing</li>
                            <li>Query existing module structure</li>
                            <li>Export production-ready MIC files</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full MAP specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/rfcs/0002-mind-ai-protocol.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                RFC-0002: Mind AI Protocol
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "MIC Format", href: "/docs/mic" }}
                        next={{ label: "MLIR Lowering", href: "/docs/mlir" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/map" />
                </main>
            </div>
        </div>
    );
}
