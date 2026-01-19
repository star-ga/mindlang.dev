import { Metadata } from "next";
import Link from "next/link";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Using Core v1 Today",
    description: "A practical, end-to-end guide to using the MIND Core v1 toolchain.",
};

export default function UsingCoreV1Page() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/using-core-v1" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/using-core-v1" />
                    <h1 className="page-title mt-4">Using MIND Core v1 Today</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            This page gives a <strong>practical, end-to-end guide</strong> to using the MIND Core v1 toolchain: surface language → IR → autodiff → MLIR → CPU runtime → conformance.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">1. Installing mindc</h2>
                        <h3 className="text-lg font-bold mt-6 mb-3">From source</h3>
                        <p className="text-muted mb-4">Clone and build:</p>
                        <CodeBlock className="mb-6">{`git clone https://github.com/cputer/mind.git
cargo build --release
./target/release/mindc --help`}</CodeBlock>

                        <h3 className="text-lg font-bold mt-6 mb-3">Validating installation</h3>
                        <CodeBlock className="mb-4">{`mindc --version
mindc --stability`}</CodeBlock>
                        <p className="text-muted mb-8">Both commands reflect the published Core v1 stability & versioning contract.</p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">2. Writing your first Core v1 program</h2>
                        <p className="text-muted mb-4">Create a file <code>simple.mind</code>:</p>
                        <CodeBlock className="mb-4">{`fn main(x: tensor<f32>[2, 2]) -> tensor<f32>[2, 2] {
  let y = x + x
  return y
}`}</CodeBlock>
                        <p className="text-muted mb-4">Compile to IR:</p>
                        <CodeBlock className="mb-8">{`mindc simple.mind -o simple.ir`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">3. Running through the CPU runtime</h2>
                        <p className="text-muted mb-4">Use the runtime CLI (from <code>mind-runtime</code> repo):</p>
                        <CodeBlock className="mb-4">{`runtime run simple.ir --input x=[1,2,3,4]`}</CodeBlock>
                        <p className="text-muted mb-4">Expected output:</p>
                        <CodeBlock className="mb-8">{`[[2,4],[6,8]]`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">4. Using autodiff</h2>
                        <p className="text-muted mb-4">Extend <code>simple.mind</code>:</p>
                        <CodeBlock className="mb-4">{`fn main(x: tensor<f32>[2]) -> tensor<f32>[1] {
  let y = sum(x)
  return y
}`}</CodeBlock>
                        <p className="text-muted mb-4">Generate gradient IR:</p>
                        <CodeBlock className="mb-8">{`mindc simple.mind --grad --func main -o grad.ir`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">5. Lowering to MLIR (CPU backend)</h2>
                        <CodeBlock className="mb-8">{`mindc main.mind --mlir -o main.mlir`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">6. Verifying conformance</h2>
                        <p className="text-muted mb-4">CPU baseline:</p>
                        <CodeBlock className="mb-4">{`mindc conformance --profile cpu`}</CodeBlock>
                        <p className="text-muted mb-4">GPU profile:</p>
                        <CodeBlock className="mb-8">{`mindc conformance --profile gpu`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">What to read next</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li><Link href="/docs/cookbook" className="text-primary hover:underline">Cookbook</Link> (real examples)</li>
                            <li><Link href="/docs/conformance" className="text-primary hover:underline">Conformance</Link></li>
                            <li><Link href="/docs/stability" className="text-primary hover:underline">Stability & Versioning</Link></li>
                        </ul>
                    </div>

                    <PageNavigation
                        prev={{ label: "Installation", href: "/docs/installation" }}
                        next={{ label: "Cookbook", href: "/docs/cookbook" }}
                    />

                </main>
            </div>
        </div>
    );
}
