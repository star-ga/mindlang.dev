import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "MindIR Compact (MIC)",
    description: "Token-efficient IR serialization format for AI agents and tooling.",
};

export default function MICPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/mic" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">MindIR Compact (MIC)</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIC is a text-based, line-oriented format designed for minimal token usage when working with AI agents, git-friendly diffs, and deterministic serialization.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Design Goals</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>5.3x token reduction</strong> compared to JSON serialization</li>
                            <li><strong>2.4x faster parsing</strong> than JSON (2.26 us vs 5.31 us)</li>
                            <li><strong>Git-friendly diffs</strong> with one node per line</li>
                            <li><strong>Stable IDs</strong> for safe patching operations</li>
                            <li><strong>Deterministic canonicalization</strong> for reproducible outputs</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Benchmark Results</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Format</th>
                                        <th className="text-left py-2 pr-4 font-bold">Tokens</th>
                                        <th className="text-left py-2 pr-4 font-bold">vs JSON</th>
                                        <th className="text-left py-2 pr-4 font-bold">Parse Speed</th>
                                        <th className="text-left py-2 font-bold">Annual Cost (1M IRs)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">JSON</td>
                                        <td className="py-2 pr-4">278</td>
                                        <td className="py-2 pr-4">baseline</td>
                                        <td className="py-2 pr-4">5.31 us</td>
                                        <td className="py-2">$487</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">TOML</td>
                                        <td className="py-2 pr-4">151</td>
                                        <td className="py-2 pr-4">1.8x</td>
                                        <td className="py-2 pr-4">137.06 us</td>
                                        <td className="py-2">$264</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">TOON</td>
                                        <td className="py-2 pr-4">67</td>
                                        <td className="py-2 pr-4">4.1x</td>
                                        <td className="py-2 pr-4">2.67 us</td>
                                        <td className="py-2">$117</td>
                                    </tr>
                                    <tr className="border-b bg-primary/5">
                                        <td className="py-2 pr-4 font-bold">MIC</td>
                                        <td className="py-2 pr-4 font-bold">52</td>
                                        <td className="py-2 pr-4 font-bold">5.3x</td>
                                        <td className="py-2 pr-4 font-bold">2.26 us</td>
                                        <td className="py-2 font-bold">$91</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-muted mb-8">
                            MIC saves <strong>$396/year</strong> per million IR operations vs JSON at GPT-5.2 pricing ($0.00175/1K input tokens).
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Format Overview</h2>
                        <CodeBlock className="mb-8">{`mic@1                    # Version header
S0 "input"               # Symbol table
T0 f32                   # Type table (scalar)
T1 [f32;3,4]             # Tensor type (3x4 matrix)
N1 const.i64 42 T0       # Node definitions
N2 add N1 N1 T0          # Binary operation
O N2                     # Output marker`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Line Types</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Prefix</th>
                                        <th className="text-left py-2 pr-4 font-bold">Purpose</th>
                                        <th className="text-left py-2 font-bold">Example</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">mic@N</td>
                                        <td className="py-2 pr-4">Version header</td>
                                        <td className="py-2 font-mono">mic@1</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">S&lt;id&gt;</td>
                                        <td className="py-2 pr-4">Symbol definition</td>
                                        <td className="py-2 font-mono">S0 &quot;weight&quot;</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">T&lt;id&gt;</td>
                                        <td className="py-2 pr-4">Type definition</td>
                                        <td className="py-2 font-mono">T0 [f32;B,128]</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">N&lt;id&gt;</td>
                                        <td className="py-2 pr-4">Node definition</td>
                                        <td className="py-2 font-mono">N5 matmul N3 N4 T1</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">O</td>
                                        <td className="py-2 pr-4">Output marker</td>
                                        <td className="py-2 font-mono">O N5</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">#</td>
                                        <td className="py-2 pr-4">Comment</td>
                                        <td className="py-2 font-mono"># Layer 1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Supported Operations</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Category</th>
                                        <th className="text-left py-2 font-bold">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Constants</td>
                                        <td className="py-2 font-mono">const.i64, const.f32, const.tensor</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Arithmetic</td>
                                        <td className="py-2 font-mono">add, sub, mul, div</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Linear Algebra</td>
                                        <td className="py-2 font-mono">matmul, dot, transpose</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Reductions</td>
                                        <td className="py-2 font-mono">sum, mean, sum_all, mean_all</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Shape</td>
                                        <td className="py-2 font-mono">reshape, squeeze, expand_dims, gather</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Activations</td>
                                        <td className="py-2 font-mono">relu, conv2d</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Type Syntax</h2>
                        <CodeBlock className="mb-8">{`# Scalar types
T0 f32
T1 i64
T2 bool

# Tensor types: [dtype;dim1,dim2,...]
T3 [f32;3,4]           # 3x4 matrix
T4 [f32;B,128]         # Batch x 128 (symbolic B)
T5 [f32;?,?]           # Dynamic shape`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example: Simple Neural Network</h2>
                        <CodeBlock className="mb-8">{`mic@1
# Types
T0 [f32;B,784]         # Input: batch x 784
T1 [f32;784,256]       # Weight 1
T2 [f32;B,256]         # Hidden layer
T3 [f32;256,10]        # Weight 2
T4 [f32;B,10]          # Output

# Nodes
N0 param S0 T0         # Input
N1 param S1 T1         # W1
N2 matmul N0 N1 T2     # x @ W1
N3 relu N2 T2          # ReLU activation
N4 param S2 T3         # W2
N5 matmul N3 N4 T4     # hidden @ W2
O N5                   # Output`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Security Limits</h2>
                        <p className="text-muted mb-4">
                            The MIC parser enforces strict limits to prevent denial-of-service attacks:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Input size:</strong> 10 MB maximum</li>
                            <li><strong>Node count:</strong> 100,000 maximum</li>
                            <li><strong>Shape dimensions:</strong> 32 maximum</li>
                            <li><strong>Interned strings:</strong> 100,000 maximum</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Rust API</h2>
                        <CodeBlock className="mb-8">{`use mind::ir::compact::{emit_mic, parse_mic};
use mind::ir::IRModule;

// Parse MIC to IR
let module = parse_mic(mic_str)?;

// Emit IR to MIC
let mic = emit_mic(&module);

// Roundtrip is deterministic
assert_eq!(emit_mic(&parse_mic(&mic)?), mic);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full MIC specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/rfcs/0001-mindir-compact.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                RFC-0001: MindIR Compact
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "IR", href: "/docs/ir" }}
                        next={{ label: "MAP Protocol", href: "/docs/map" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/mic" />
                </main>
            </div>
        </div>
    );
}
