import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "MindIR Compact (MIC)",
    description: "Token-efficient IR serialization formats for AI agents and tooling.",
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
                            MIC is a family of compact serialization formats for Mind IR graphs, designed for minimal token usage, fast parsing, and deterministic output.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Format Versions</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="border rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-2">mic@1 (Legacy)</h3>
                                <p className="text-muted text-sm mb-4">Original text format with explicit node IDs and verbose opcodes.</p>
                                <ul className="text-sm text-muted space-y-1">
                                    <li>Explicit IDs: <code>N0</code>, <code>N1</code>, <code>N2</code></li>
                                    <li>Verbose ops: <code>add</code>, <code>matmul</code>, <code>relu</code></li>
                                    <li>Bracket syntax: <code>[f32;3,4]</code></li>
                                </ul>
                            </div>
                            <div className="border rounded-lg p-6 bg-primary/5 border-primary/20">
                                <h3 className="font-bold text-lg mb-2">mic@2 (Current)</h3>
                                <p className="text-muted text-sm mb-4">Next-gen text format with implicit IDs and compact opcodes.</p>
                                <ul className="text-sm text-muted space-y-1">
                                    <li>Implicit IDs by order of appearance</li>
                                    <li>Compact ops: <code>+</code>, <code>m</code>, <code>r</code></li>
                                    <li>Space syntax: <code>f32 3 4</code></li>
                                </ul>
                                <Link href="/docs/mic/v2" className="text-primary text-sm hover:underline mt-2 inline-block">
                                    Learn more →
                                </Link>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="border rounded-lg p-6 bg-primary/5 border-primary/20">
                                <h3 className="font-bold text-lg mb-2">MIC-B v2 (Binary)</h3>
                                <p className="text-muted text-sm mb-4">Compact binary format with ULEB128 varints.</p>
                                <ul className="text-sm text-muted space-y-1">
                                    <li>~4x smaller than mic@2 text</li>
                                    <li>Direct memory mapping possible</li>
                                    <li>Deterministic byte output</li>
                                </ul>
                                <Link href="/docs/mic/binary" className="text-primary text-sm hover:underline mt-2 inline-block">
                                    Learn more →
                                </Link>
                            </div>
                            <div className="border rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-2">Format Detection</h3>
                                <p className="text-muted text-sm mb-4">Automatic format detection by magic bytes or header.</p>
                                <CodeBlock>{`use mind::ir::compact::v2::detect_format;

match detect_format(data) {
    MicFormat::Mic2 => parse_mic2(..),
    MicFormat::MicB => parse_micb(..),
    MicFormat::Mic1 => parse_mic(..),
    _ => Err("unknown format"),
}`}</CodeBlock>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Comparison</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Format</th>
                                        <th className="text-left py-2 pr-4 font-bold">Tokens</th>
                                        <th className="text-left py-2 pr-4 font-bold">Bytes</th>
                                        <th className="text-left py-2 pr-4 font-bold">vs JSON</th>
                                        <th className="text-left py-2 font-bold">Use Case</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">JSON</td>
                                        <td className="py-2 pr-4">~180</td>
                                        <td className="py-2 pr-4">~450</td>
                                        <td className="py-2 pr-4">baseline</td>
                                        <td className="py-2">Legacy interchange</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">mic@1</td>
                                        <td className="py-2 pr-4">~45</td>
                                        <td className="py-2 pr-4">~120</td>
                                        <td className="py-2 pr-4">4x</td>
                                        <td className="py-2">Legacy text format</td>
                                    </tr>
                                    <tr className="border-b bg-primary/5">
                                        <td className="py-2 pr-4 font-bold">mic@2</td>
                                        <td className="py-2 pr-4 font-bold">~28</td>
                                        <td className="py-2 pr-4 font-bold">~85</td>
                                        <td className="py-2 pr-4 font-bold">6.4x</td>
                                        <td className="py-2">LLM prompts, git diffs</td>
                                    </tr>
                                    <tr className="border-b bg-primary/5">
                                        <td className="py-2 pr-4 font-bold">MIC-B v2</td>
                                        <td className="py-2 pr-4 font-bold">-</td>
                                        <td className="py-2 pr-4 font-bold">~40</td>
                                        <td className="py-2 pr-4 font-bold">11x</td>
                                        <td className="py-2">Storage, network transfer</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-muted text-sm mb-8">
                            Benchmark: residual block <code>Y = relu(X @ W + b) + X</code>
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Side-by-Side Example</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h4 className="font-bold mb-2">mic@1 (120 bytes)</h4>
                                <CodeBlock>{`mic@1
T0 [f16;128,128]
T1 [f16;128]
N0 param "X" T0
N1 param "W" T0
N2 param "b" T1
N3 matmul N0 N1 T0
N4 add N3 N2 T0
N5 relu N4 T0
N6 add N5 N0 T0
O N6`}</CodeBlock>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">mic@2 (85 bytes)</h4>
                                <CodeBlock>{`mic@2
T0 f16 128 128
T1 f16 128
a X T0
p W T0
p b T1
m 0 1
+ 3 2
r 4
+ 5 0
O 6`}</CodeBlock>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Key Design Principles</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Token efficiency:</strong> Minimize LLM tokens for AI agent workflows</li>
                            <li><strong>Git-friendly:</strong> One operation per line for clean diffs</li>
                            <li><strong>Deterministic:</strong> Same graph always produces identical bytes</li>
                            <li><strong>Lossless roundtrip:</strong> mic@2 ↔ MIC-B ↔ Mind IR</li>
                            <li><strong>Security limits:</strong> Bounded inputs prevent DoS attacks</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Rust API</h2>
                        <CodeBlock className="mb-8">{`use mind::ir::compact::v2::{
    parse_mic2, emit_mic2,      // Text format
    parse_micb, emit_micb,      // Binary format
    detect_format, MicFormat,   // Auto-detection
};

// Parse mic@2 text to Graph
let graph = parse_mic2(text)?;

// Emit Graph to mic@2 text
let text = emit_mic2(&graph);

// Parse MIC-B binary to Graph
let graph = parse_micb(&mut cursor)?;

// Emit Graph to MIC-B binary
emit_micb(&graph, &mut writer)?;

// Roundtrip is deterministic
assert_eq!(emit_mic2(&parse_mic2(&text)?), text);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Security Limits</h2>
                        <p className="text-muted mb-4">
                            All MIC parsers enforce strict limits to prevent denial-of-service attacks:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li><strong>Input size:</strong> 10 MB maximum</li>
                            <li><strong>Value count:</strong> 100,000 maximum</li>
                            <li><strong>String count:</strong> 1,000,000 maximum (binary)</li>
                            <li><strong>Shape dimensions:</strong> 32 maximum</li>
                            <li><strong>String length:</strong> 64 KB maximum (binary)</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Link href="/docs/mic/v2" className="block border rounded-lg p-4 hover:border-primary/50 transition-colors">
                                <h4 className="font-bold mb-1">mic@2 Text Format</h4>
                                <p className="text-sm text-muted">Grammar, opcodes, and examples</p>
                            </Link>
                            <Link href="/docs/mic/binary" className="block border rounded-lg p-4 hover:border-primary/50 transition-colors">
                                <h4 className="font-bold mb-1">MIC-B Binary Format</h4>
                                <p className="text-sm text-muted">Wire format, ULEB128, tables</p>
                            </Link>
                        </div>

                        <p className="text-muted mt-8">
                            See the full specifications at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/mic/" target="_blank" rel="noopener" className="text-primary hover:underline">
                                cputer/mind-spec
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "IR", href: "/docs/ir" }}
                        next={{ label: "mic@2 Format", href: "/docs/mic/v2" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/mic" />
                </main>
            </div>
        </div>
    );
}
