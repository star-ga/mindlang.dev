import { Metadata } from "next";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsSidebar } from "@/components/ui/DocsSidebar";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const metadata: Metadata = {
    title: "FFI & Bindings",
    description: "Using MIND from C, Python, and Rust through the Foreign Function Interface.",
};

export default function FFIPage() {
    return (
        <div className="container !pt-12 !pb-16">
            <div className="flex gap-12">
                <DocsSidebar currentPath="/docs/ffi" />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <DocsHeader currentPath="/docs/ffi" />
                    <h1 className="page-title mt-4">FFI & Bindings</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-muted mb-8">
                            MIND provides a Foreign Function Interface (FFI) for integrating compiled models with C, Python, and Rust applications.
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Python Bindings</h2>
                        <p className="text-muted mb-4">
                            The Python bindings provide a high-level API for loading and running MIND models:
                        </p>
                        <CodeBlock className="mb-4">{`import mind

# Load a compiled model
runtime = mind.Runtime()
model = mind.Model.load("model.mind.bin")

# Run inference
input_tensor = mind.tensor([[1.0, 2.0], [3.0, 4.0]])
output = model.forward(input_tensor)

print(output.numpy())`}</CodeBlock>
                        <p className="text-muted mb-8">
                            Install with: <code>pip install mind-runtime</code> (coming soon)
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">C API</h2>
                        <p className="text-muted mb-4">
                            The C API provides low-level access for embedded and systems programming:
                        </p>
                        <CodeBlock className="mb-4">{`#include "mind_runtime.h"

int main() {
    // Initialize runtime
    mind_runtime_t runtime;
    mind_runtime_create(&runtime);

    // Load model
    mind_model_t model;
    mind_model_load(&runtime, "model.mind.bin", &model);

    // Create input tensor
    float input_data[] = {1.0f, 2.0f, 3.0f, 4.0f};
    int64_t shape[] = {2, 2};
    mind_tensor_t input;
    mind_tensor_create(&runtime, input_data, shape, 2, MIND_F32, &input);

    // Run inference
    mind_tensor_t output;
    mind_model_forward(&model, &input, &output);

    // Cleanup
    mind_tensor_destroy(&output);
    mind_tensor_destroy(&input);
    mind_model_destroy(&model);
    mind_runtime_destroy(&runtime);

    return 0;
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Rust Crate</h2>
                        <p className="text-muted mb-4">
                            Native Rust integration with the <code>mind-runtime</code> crate:
                        </p>
                        <CodeBlock className="mb-4">{`use mind_runtime::{Runtime, Model, Tensor};

fn main() -> Result<(), mind_runtime::Error> {
    // Initialize runtime
    let runtime = Runtime::new()?;

    // Load model
    let model = Model::load(&runtime, "model.mind.bin")?;

    // Create input tensor
    let input = Tensor::from_slice(&runtime, &[1.0f32, 2.0, 3.0, 4.0], &[2, 2])?;

    // Run inference
    let output = model.forward(&input)?;

    println!("Output: {:?}", output.to_vec::<f32>()?);

    Ok(())
}`}</CodeBlock>
                        <p className="text-muted mb-8">
                            Add to Cargo.toml: <code>mind-runtime = {'"'}0.1{'"'}</code>
                        </p>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">ABI Stability</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted mb-8">
                            <li>The C ABI is stable within major versions</li>
                            <li>Binary model format (<code>.mind.bin</code>) follows semantic versioning</li>
                            <li>Runtime version must match or exceed model compile version</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Exporting from MIND</h2>
                        <p className="text-muted mb-4">
                            Export functions from MIND code for FFI consumption:
                        </p>
                        <CodeBlock className="mb-8">{`// In your .mind file
@export
fn predict(input: Tensor<f32, N, 784>) -> Tensor<f32, N, 10> {
    // Model implementation
    forward(input)
}`}</CodeBlock>

                        <h2 className="text-2xl font-bold font-heading mt-12 mb-4">Learn More</h2>
                        <p className="text-muted">
                            See the full FFI specification at{" "}
                            <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/ffi.md" target="_blank" rel="noopener" className="text-primary hover:underline">
                                mind-spec/ffi.md
                            </a>.
                        </p>
                    </div>

                    <PageNavigation
                        prev={{ label: "Runtime", href: "/docs/runtime" }}
                        next={{ label: "Conformance", href: "/docs/conformance" }}
                    />

                </main>
            </div>
        </div>
    );
}
