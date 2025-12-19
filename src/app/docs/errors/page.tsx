import { Metadata } from "next";
import Link from "next/link";
import { docsNavigation } from "@/data/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
    title: "Error Handling",
    description: "MIND error types, diagnostics, and recovery strategies.",
};

export default function ErrorsPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <nav className="sticky top-24">
                        {docsNavigation.map((section) => (
                            <div key={section.title} className="mb-6">
                                <h3 className="font-heading font-bold text-sm text-foreground mb-2">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`text-sm font-medium transition-colors block py-1 ${item.href === "/docs/errors" ? "!text-primary font-bold" : "!text-slate-600 hover:!text-primary"}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <h1 className="page-title mt-4">Error Handling</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND provides comprehensive error diagnostics with detailed messages, source locations, and actionable suggestions.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Error Categories</h2>
                        <div className="overflow-x-auto mb-8">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-bold">Category</th>
                                        <th className="text-left py-2 pr-4 font-bold">Code</th>
                                        <th className="text-left py-2 font-bold">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-muted">
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Parse</td>
                                        <td className="py-2 pr-4">E0001-E0099</td>
                                        <td className="py-2">Syntax errors</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Type</td>
                                        <td className="py-2 pr-4">E0100-E0199</td>
                                        <td className="py-2">Type mismatches, inference failures</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Shape</td>
                                        <td className="py-2 pr-4">E0200-E0299</td>
                                        <td className="py-2">Dimension mismatches, broadcast failures</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Autodiff</td>
                                        <td className="py-2 pr-4">E0300-E0399</td>
                                        <td className="py-2">Non-differentiable operations</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Device</td>
                                        <td className="py-2 pr-4">E0400-E0499</td>
                                        <td className="py-2">Placement and transfer errors</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 pr-4">Runtime</td>
                                        <td className="py-2 pr-4">E0500-E0599</td>
                                        <td className="py-2">Execution errors</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Example Diagnostics</h2>
                        <p className="text-muted mb-4">Shape mismatch error:</p>
                        <CodeBlock className="mb-8">{`error[E0201]: shape mismatch in matmul
  --> model.mind:12:15
   |
12 |     let y = a @ b;
   |               ^ cannot multiply tensors with shapes [2, 3] and [4, 5]
   |
   = help: matmul requires inner dimensions to match
   = note: expected shape [2, 3] @ [3, ?], got [2, 3] @ [4, 5]`}</CodeBlock>

                        <p className="text-muted mb-4">Type error with suggestion:</p>
                        <CodeBlock className="mb-8">{`error[E0102]: type mismatch
  --> train.mind:8:20
   |
 8 |     let loss: i32 = mse(pred, target);
   |               ---   ^^^^^^^^^^^^^^^^^
   |               |     expected i32, found f32
   |               expected due to this
   |
   = help: consider changing the type annotation
   |
 8 |     let loss: f32 = mse(pred, target);
   |               ~~~`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Runtime Errors</h2>
                        <p className="text-muted mb-4">
                            Runtime errors occur during execution and include stack traces:
                        </p>
                        <CodeBlock className="mb-8">{`runtime error[E0501]: index out of bounds
  --> inference.mind:24:10
   |
24 |     x[i]
   |     ^^^^ index 10 is out of bounds for tensor of length 5
   |
stack trace:
  0: get_element at inference.mind:24:10
  1: process_batch at inference.mind:18:5
  2: main at inference.mind:5:3`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Result Type</h2>
                        <p className="text-muted mb-4">
                            For recoverable errors, use the Result type:
                        </p>
                        <CodeBlock className="mb-8">{`fn load_model(path: str) -> Result<Model, Error> {
    if !exists(path) {
        return Err(Error::NotFound(path));
    }
    // ...
    Ok(model)
}

fn main() {
    match load_model("model.mind.bin") {
        Ok(model) => run(model),
        Err(e) => print("Failed to load: ", e),
    }
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full error catalog at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/errors.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/errors.md
                            </a>.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
