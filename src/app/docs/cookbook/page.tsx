import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DocsSidebar, MobileDocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "Cookbook",
    description: "A collection of short, practical recipes demonstrating how to use Core v1 in real workflows.",
};

export default function CookbookPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/cookbook" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">MIND Core v1 Cookbook</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            A collection of short, practical recipes demonstrating how to use Core v1 in real workflows.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Recipe 1 — Simple arithmetic (CPU)</h2>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                            {`fn main(x: tensor<f32>[4]) -> tensor<f32>[4] { return x * 2.0 }`}
                        </pre>
                        <p className="text-muted mb-4">Run:</p>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-8">
                            {`mindc scale.mind -o scale.ir
runtime run scale.ir --input x=[1,2,3,4]`}
                        </pre>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Recipe 2 — Autodiff of a loss function</h2>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                            {`fn main(x: tensor<f32>[3]) -> tensor<f32>[1] {
  let y = sum(x * x)
  return y
}`}
                        </pre>
                        <p className="text-muted mb-4">Gradient IR:</p>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                            {`mindc loss.mind --grad --func main -o loss.grad.ir`}
                        </pre>
                        <p className="text-muted mb-8">Expected gradient: <code>2 * x</code>.</p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Recipe 3 — MLIR lowering for CPU</h2>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-8">
                            {`mindc scale.mind --mlir -o scale.mlir`}
                        </pre>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Recipe 4 — GPU profile: correct error handling</h2>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                            {`mindc main.mind --target gpu`}
                        </pre>
                        <p className="text-muted mb-4">Expected result (Core v1-stable):</p>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-8">
                            {`error[runtime]: backend 'gpu' unavailable`}
                        </pre>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Recipe 5 — Host embedding via the runtime API</h2>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                            {`let rt = MindRuntime::new_cpu()?;
let inp = rt.allocate(&tensor_desc_f32(&[2]))?;
rt.write_tensor(inp, &[1.0, 3.0])?;

let out = rt.allocate(&tensor_desc_f32(&[1]))?;
rt.run_op("sum", &[inp], &[out])?;

let result = rt.read_tensor(out)?;`}
                        </pre>
                        <p className="text-muted mb-8">Output: <code>4.0</code>.</p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Recipe 6 — Running the official conformance suite</h2>
                        <p className="text-muted mb-4">CPU baseline:</p>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                            {`mindc conformance --profile cpu`}
                        </pre>
                        <p className="text-muted mb-4">GPU profile:</p>
                        <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                            {`mindc conformance --profile gpu`}
                        </pre>
                    </div>

                    <PageNavigation
                        prev={{ label: "Using Core v1", href: "/docs/using-core-v1" }}
                        next={{ label: "Language", href: "/docs/language" }}
                    />

                    <MobileDocsSidebar currentPath="/docs/cookbook" />
                </main>
            </div>
        </div>
    );
}
