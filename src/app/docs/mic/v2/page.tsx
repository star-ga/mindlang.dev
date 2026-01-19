import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "mic@2 Text Format",
    description: "Compact line-oriented text format for Mind IR with implicit value IDs.",
};

export default function MicV2Page() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/mic/v2" />

                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">mic@2 Text Format</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            mic@2 is a compact, line-oriented text format for Mind IR graphs, designed for minimal token usage when working with AI agents.
                        </p>

                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
                            <h4 className="font-bold mb-2">Key Improvements over mic@1</h4>
                            <ul className="text-sm text-muted space-y-1 mb-0">
                                <li><strong>~33% token reduction</strong> (35 vs 52 tokens) through implicit value IDs</li>
                                <li><strong>~33% size reduction</strong> (140 vs 209 bytes)</li>
                                <li><strong>Compact opcodes:</strong> <code>m</code>, <code>+</code>, <code>r</code> instead of <code>matmul</code>, <code>add</code>, <code>relu</code></li>
                                <li><strong>Space-separated dims:</strong> <code>f16 128 128</code> instead of <code>[f16;128,128]</code></li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Quick Example</h2>
                        <CodeBlock className="mb-4">{`mic@2
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
                        <p className="text-muted mb-8">
                            This represents <code>Y = relu(X @ W + b) + X</code> (a residual block).
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Value ID Assignment</h2>
                        <p className="text-muted mb-4">
                            Values are assigned <strong>implicit sequential IDs</strong> starting at 0, in the order they appear:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Line</th>
                                        <th className="text-left py-2 pr-4 font-bold">ID</th>
                                        <th className="text-left py-2 font-bold">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">a X T0</td>
                                        <td className="py-2 pr-4">0</td>
                                        <td className="py-2">Input tensor X</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">p W T0</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Weight matrix W</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">p b T1</td>
                                        <td className="py-2 pr-4">2</td>
                                        <td className="py-2">Bias vector b</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">m 0 1</td>
                                        <td className="py-2 pr-4">3</td>
                                        <td className="py-2">X @ W</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">+ 3 2</td>
                                        <td className="py-2 pr-4">4</td>
                                        <td className="py-2">(X @ W) + b</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">r 4</td>
                                        <td className="py-2 pr-4">5</td>
                                        <td className="py-2">relu((X @ W) + b)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">+ 5 0</td>
                                        <td className="py-2 pr-4">6</td>
                                        <td className="py-2">relu(...) + X (residual)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">O 6</td>
                                        <td className="py-2 pr-4">-</td>
                                        <td className="py-2">Output is value 6</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Line Types</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Prefix</th>
                                        <th className="text-left py-2 pr-4 font-bold">Purpose</th>
                                        <th className="text-left py-2 font-bold">Syntax</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">mic@2</td>
                                        <td className="py-2 pr-4">Version header</td>
                                        <td className="py-2 font-mono">mic@2</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">S</td>
                                        <td className="py-2 pr-4">Symbol declaration</td>
                                        <td className="py-2 font-mono">S &lt;name&gt;</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">T&lt;idx&gt;</td>
                                        <td className="py-2 pr-4">Type definition</td>
                                        <td className="py-2 font-mono">T0 f16 128 128</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">a</td>
                                        <td className="py-2 pr-4">Argument (input)</td>
                                        <td className="py-2 font-mono">a &lt;name&gt; T&lt;idx&gt;</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">p</td>
                                        <td className="py-2 pr-4">Parameter (weight)</td>
                                        <td className="py-2 font-mono">p &lt;name&gt; T&lt;idx&gt;</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">&lt;op&gt;</td>
                                        <td className="py-2 pr-4">Node operation</td>
                                        <td className="py-2 font-mono">m 0 1</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">O</td>
                                        <td className="py-2 pr-4">Output marker</td>
                                        <td className="py-2 font-mono">O &lt;value_id&gt;</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">#</td>
                                        <td className="py-2 pr-4">Comment</td>
                                        <td className="py-2 font-mono"># Layer 1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Opcodes</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Token</th>
                                        <th className="text-left py-2 pr-4 font-bold">Name</th>
                                        <th className="text-left py-2 pr-4 font-bold">Arity</th>
                                        <th className="text-left py-2 font-bold">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">m</td>
                                        <td className="py-2 pr-4">Matmul</td>
                                        <td className="py-2 pr-4">2</td>
                                        <td className="py-2">Matrix multiplication</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">+</td>
                                        <td className="py-2 pr-4">Add</td>
                                        <td className="py-2 pr-4">2</td>
                                        <td className="py-2">Element-wise addition</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">-</td>
                                        <td className="py-2 pr-4">Sub</td>
                                        <td className="py-2 pr-4">2</td>
                                        <td className="py-2">Element-wise subtraction</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">*</td>
                                        <td className="py-2 pr-4">Mul</td>
                                        <td className="py-2 pr-4">2</td>
                                        <td className="py-2">Element-wise multiplication</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">/</td>
                                        <td className="py-2 pr-4">Div</td>
                                        <td className="py-2 pr-4">2</td>
                                        <td className="py-2">Element-wise division</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">r</td>
                                        <td className="py-2 pr-4">Relu</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">ReLU activation</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">s</td>
                                        <td className="py-2 pr-4">Softmax</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Softmax (optional axis)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">sig</td>
                                        <td className="py-2 pr-4">Sigmoid</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Sigmoid activation</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">th</td>
                                        <td className="py-2 pr-4">Tanh</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Tanh activation</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">gelu</td>
                                        <td className="py-2 pr-4">GELU</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">GELU activation</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">ln</td>
                                        <td className="py-2 pr-4">LayerNorm</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Layer normalization</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">t</td>
                                        <td className="py-2 pr-4">Transpose</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Transpose (perm params)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">rshp</td>
                                        <td className="py-2 pr-4">Reshape</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Reshape</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">sum</td>
                                        <td className="py-2 pr-4">Sum</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Sum reduction (axis params)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">mean</td>
                                        <td className="py-2 pr-4">Mean</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Mean reduction (axis params)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">max</td>
                                        <td className="py-2 pr-4">Max</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Max reduction (axis params)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">cat</td>
                                        <td className="py-2 pr-4">Concat</td>
                                        <td className="py-2 pr-4">N</td>
                                        <td className="py-2">Concatenate (axis param)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">split</td>
                                        <td className="py-2 pr-4">Split</td>
                                        <td className="py-2 pr-4">1</td>
                                        <td className="py-2">Split (axis, count params)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4 font-mono">gth</td>
                                        <td className="py-2 pr-4">Gather</td>
                                        <td className="py-2 pr-4">2</td>
                                        <td className="py-2">Gather along axis</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Type Syntax</h2>
                        <CodeBlock className="mb-8">{`# Type definition: T<idx> <dtype> <dim0> <dim1>...
T0 f16 128 128     # 128x128 float16 matrix
T1 f32 B seq 768   # Batch x sequence x 768
T2 i64 ?           # Dynamic-shape int64

# Supported dtypes
f16, f32, f64      # Floating point
bf16               # BFloat16
i8, i16, i32, i64  # Signed integers
u8, u16, u32, u64  # Unsigned integers
bool               # Boolean

# Dimension types
128                # Fixed dimension
B, seq, hidden     # Symbolic (must declare with S)
?                  # Wildcard/dynamic`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Symbolic Dimensions</h2>
                        <p className="text-muted mb-4">
                            Declare symbolic dimension names before using them in types:
                        </p>
                        <CodeBlock className="mb-8">{`mic@2
S B
S seq
S hidden
T0 f32 B seq hidden
a X T0
O 0`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Canonicalization Rules</h2>
                        <p className="text-muted mb-4">
                            For deterministic output, canonical mic@2 follows these rules:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Unix line endings (<code>\n</code>)</li>
                            <li>Exactly one space between tokens</li>
                            <li>No trailing whitespace on lines</li>
                            <li>No trailing newline after output line</li>
                            <li>Section order: header, symbols, types, values, output</li>
                            <li>Comments are not preserved in canonical output</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Validation Rules</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Type indices must be sequential starting at 0</li>
                            <li>Type references must refer to defined types</li>
                            <li>Node inputs must reference earlier values (no forward refs)</li>
                            <li>Output must reference a valid value</li>
                            <li>Opcode arity must match input count</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Rust API</h2>
                        <CodeBlock className="mb-8">{`use mind::ir::compact::v2::{parse_mic2, emit_mic2, Graph};

// Parse mic@2 text
let graph = parse_mic2(text)?;

// Emit canonical mic@2
let canonical = emit_mic2(&graph);

// Roundtrip is deterministic
assert_eq!(emit_mic2(&parse_mic2(&canonical)?), canonical);`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Error Handling</h2>
                        <CodeBlock className="mb-8">{`use mind::ir::compact::v2::{parse_mic2, Mic2ParseError};

match parse_mic2(input) {
    Ok(graph) => { /* use graph */ }
    Err(Mic2ParseError { line, message }) => {
        eprintln!("mic@2:{}: error: {}", line, message);
    }
}`}</CodeBlock>
                    </div>

                    <PageNavigation
                        prev={{ label: "MIC Overview", href: "/docs/mic" }}
                        next={{ label: "MIC-B Binary", href: "/docs/mic/binary" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/mic/v2" />
                </main>
            </div>
        </div>
    );
}
