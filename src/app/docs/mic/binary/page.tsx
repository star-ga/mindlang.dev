import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "MIC-B v2 Binary Format",
    description: "Compact binary format for Mind IR with ULEB128 varints and deterministic serialization.",
};

export default function MicBinaryPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/mic/binary" />

                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/mic/binary" />
                    <h1 className="page-title mt-4">MIC-B v2 Binary Format</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIC-B v2 is a compact binary format for Mind IR graphs, designed for efficient storage and fast parsing with direct memory mapping.
                        </p>

                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
                            <h4 className="font-bold mb-2">Key Features</h4>
                            <ul className="text-sm text-muted space-y-1 mb-0">
                                <li><strong>~1.4-3x smaller</strong> than mic@2 text format (55 vs 78 bytes for residual block)</li>
                                <li><strong>ULEB128 varints</strong> for space-efficient integers</li>
                                <li><strong>String table deduplication</strong> for repeated identifiers</li>
                                <li><strong>Deterministic</strong> — same graph produces identical bytes</li>
                                <li><strong>Lossless roundtrip</strong> with mic@2</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Wire Format Layout</h2>
                        <CodeBlock className="mb-4">{`┌─────────────────┬──────────────────────────────────┐
│ Offset          │ Content                          │
├─────────────────┼──────────────────────────────────┤
│ 0-3             │ Magic: "MICB" (4 bytes ASCII)    │
│ 4               │ Version: 0x02                    │
│ 5+              │ String Table                     │
│ ...             │ Symbol Table                     │
│ ...             │ Type Table                       │
│ ...             │ Value Table                      │
│ ...             │ Output (1 uleb128)               │
└─────────────────┴──────────────────────────────────┘`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">ULEB128 Encoding</h2>
                        <p className="text-muted mb-4">
                            Unsigned Little-Endian Base-128 encoding uses 7 bits per byte for data, with the MSB as a continuation flag:
                        </p>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Value</th>
                                        <th className="text-left py-2 font-bold">Encoded Bytes</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted font-mono">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">0</td>
                                        <td className="py-2">[0x00]</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">127</td>
                                        <td className="py-2">[0x7F]</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">128</td>
                                        <td className="py-2">[0x80, 0x01]</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">16383</td>
                                        <td className="py-2">[0xFF, 0x7F]</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">16384</td>
                                        <td className="py-2">[0x80, 0x80, 0x01]</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Zigzag Encoding</h2>
                        <p className="text-muted mb-4">
                            Signed integers use zigzag encoding before ULEB128 for efficient representation of small negative values:
                        </p>
                        <CodeBlock className="mb-4">{`// Zigzag mapping
0  →  0
-1 →  1
1  →  2
-2 →  3
2  →  4
...

// Formula
encode(n) = (n << 1) ^ (n >> 63)
decode(z) = (z >> 1) ^ -(z & 1)`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Table Structures</h2>

                        <h3 className="text-xl font-bold mt-8 mb-4">1. String Table</h3>
                        <p className="text-muted mb-4">Interned strings for names and dimension tokens:</p>
                        <CodeBlock className="mb-4">{`uleb128     count           # number of strings
repeat count:
  uleb128   byte_length     # UTF-8 byte length
  bytes     data            # UTF-8 content (no null terminator)`}</CodeBlock>

                        <h3 className="text-xl font-bold mt-8 mb-4">2. Symbol Table</h3>
                        <p className="text-muted mb-4">References to symbolic dimension names:</p>
                        <CodeBlock className="mb-4">{`uleb128     count           # number of symbols
repeat count:
  uleb128   string_idx      # index into string table`}</CodeBlock>

                        <h3 className="text-xl font-bold mt-8 mb-4">3. Type Table</h3>
                        <p className="text-muted mb-4">Tensor type definitions:</p>
                        <CodeBlock className="mb-4">{`uleb128     count           # number of types
repeat count:
  u8        dtype           # data type (see table)
  uleb128   rank            # number of dimensions
  repeat rank:
    uleb128 dim_str_idx     # index into string table`}</CodeBlock>

                        <h4 className="font-bold mt-4 mb-2">Data Type Encoding</h4>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Byte</th>
                                        <th className="text-left py-2 font-bold">Type</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">0</td><td className="py-2">f16</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">1</td><td className="py-2">f32</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">2</td><td className="py-2">f64</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">3</td><td className="py-2">bf16</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">4-7</td><td className="py-2">i8, i16, i32, i64</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">8-11</td><td className="py-2">u8, u16, u32, u64</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">12</td><td className="py-2">bool</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold mt-8 mb-4">4. Value Table</h3>
                        <p className="text-muted mb-4">Values with implicit sequential IDs:</p>
                        <CodeBlock className="mb-4">{`uleb128     count           # number of values
repeat count:
  u8        tag             # 0=Arg, 1=Param, 2=Node
  ...       payload         # tag-specific data`}</CodeBlock>

                        <h4 className="font-bold mt-4 mb-2">Arg/Param Payload (tag 0 or 1)</h4>
                        <CodeBlock className="mb-4">{`uleb128     name_str_idx    # index into string table
uleb128     type_idx        # index into type table`}</CodeBlock>

                        <h4 className="font-bold mt-4 mb-2">Node Payload (tag 2)</h4>
                        <CodeBlock className="mb-4">{`u8          opcode          # opcode byte
...         opcode_params   # opcode-specific parameters
uleb128     input_count     # number of inputs
repeat input_count:
  uleb128   input_id        # value ID (must be < current)`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Opcode Encoding</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Byte</th>
                                        <th className="text-left py-2 pr-4 font-bold">Opcode</th>
                                        <th className="text-left py-2 font-bold">Extra Params</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">0</td><td className="py-2 pr-4">Matmul</td><td className="py-2">none</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">1-4</td><td className="py-2 pr-4">Add, Sub, Mul, Div</td><td className="py-2">none</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">5</td><td className="py-2 pr-4">Relu</td><td className="py-2">none</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">6</td><td className="py-2 pr-4">Softmax</td><td className="py-2">sleb128 axis</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">7-10</td><td className="py-2 pr-4">Sigmoid, Tanh, GELU, LayerNorm</td><td className="py-2">none</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">11</td><td className="py-2 pr-4">Transpose</td><td className="py-2">uleb128 n, n × sleb128</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">12</td><td className="py-2 pr-4">Reshape</td><td className="py-2">none</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">13-15</td><td className="py-2 pr-4">Sum, Mean, Max</td><td className="py-2">uleb128 n, n × sleb128 axes</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">16</td><td className="py-2 pr-4">Concat</td><td className="py-2">sleb128 axis</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">17</td><td className="py-2 pr-4">Split</td><td className="py-2">sleb128 axis, uleb128 count</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">18</td><td className="py-2 pr-4">Gather</td><td className="py-2">sleb128 axis</td></tr>
                                    <tr className="border-b"><td className="py-2 pr-4 font-mono">255</td><td className="py-2 pr-4">Custom</td><td className="py-2">uleb128 name_str_idx</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Binary Example</h2>
                        <p className="text-muted mb-4">
                            Residual block <code>Y = relu(X @ W + b) + X</code> (~55 bytes vs 78 bytes mic@2 text):
                        </p>
                        <CodeBlock className="mb-8">{`4D 49 43 42 02              # Magic "MICB" + version 2
05                          # 5 strings
03 31 32 38                 # "128"
01 58                       # "X"
01 57                       # "W"
01 62                       # "b"
00                          # 0 symbols
02                          # 2 types
00 02 00 00                 # T0: f16 [128, 128]
00 01 00                    # T1: f16 [128]
07                          # 7 values
00 01 00                    # Arg("X", T0)
01 02 00                    # Param("W", T0)
01 03 01                    # Param("b", T1)
02 00 02 00 01              # Node(Matmul, [0, 1])
02 01 02 03 02              # Node(Add, [3, 2])
02 05 01 04                 # Node(Relu, [4])
02 01 02 05 00              # Node(Add, [5, 0])
06                          # Output: 6`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Determinism Rules</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>String table uses first-seen insertion order</li>
                            <li>All tables maintain graph definition order</li>
                            <li>Varints use minimal encoding (no zero-padding)</li>
                            <li>No padding bytes between sections</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Rust API</h2>
                        <CodeBlock className="mb-8">{`use mind::ir::compact::v2::{parse_micb, emit_micb, Graph, MicbError};
use std::io::Cursor;

// Parse MIC-B binary
let mut cursor = Cursor::new(bytes);
let graph = parse_micb(&mut cursor)?;

// Emit Graph to MIC-B binary
let mut output = Vec::new();
emit_micb(&graph, &mut output)?;

// Roundtrip is deterministic
let mut cursor2 = Cursor::new(&output);
assert!(graph.eq(&parse_micb(&mut cursor2)?));`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Validation</h2>
                        <p className="text-muted mb-4">Decoders MUST verify:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Magic bytes are exactly &quot;MICB&quot;</li>
                            <li>Version is 0x02</li>
                            <li>All string indices are in bounds</li>
                            <li>All type indices are in bounds</li>
                            <li>Node inputs reference earlier values only</li>
                            <li>Output references a valid value</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Error Handling</h2>
                        <p className="text-muted mb-4">On invalid input, decoders SHOULD:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>Return an error with byte offset</li>
                            <li>Not panic or crash</li>
                            <li>Not allocate unbounded memory</li>
                        </ul>
                    </div>

                    <PageNavigation
                        prev={{ label: "mic@2 Format", href: "/docs/mic/v2" }}
                        next={{ label: "MAP Protocol", href: "/docs/map" }}
                    />

                </main>
            </div>
        </div>
    );
}
