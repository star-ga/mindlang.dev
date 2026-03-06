import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Migration Guide: PyTorch to MIND",
  description:
    "Side-by-side guide for migrating ML models from PyTorch to MIND. Shape safety, autodiff, export, and common patterns.",
};

const comparisons = [
  {
    title: "Tensor Creation",
    pytorch: `import torch

x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
w = torch.randn(2, 3)
b = torch.zeros(3)`,
    mind: `// Shape is part of the type — verified at compile time
let x: Tensor<f32, 2, 2> = tensor([[1.0, 2.0], [3.0, 4.0]])
param w: Tensor<f32, 2, 3>
param b: Tensor<f32, 3>`,
    note: "In MIND, tensor shapes are compile-time types. A shape mismatch is a compile error, not a runtime crash.",
  },
  {
    title: "Shape Safety",
    pytorch: `# PyTorch: crashes at RUNTIME
x = torch.randn(32, 784)
w = torch.randn(256, 784)  # Wrong shape!
y = x @ w  # RuntimeError: mat1 and mat2 shapes
           # cannot be multiplied (32x784 and 256x784)`,
    mind: `// MIND: caught at COMPILE TIME
let x: Tensor<f32, ?, 784> = input()
param w: Tensor<f32, 256, 784>       // Wrong shape!
let y = matmul(x, w)
// COMPILE ERROR: matmul inner dimensions
// do not match: 784 != 256
// hint: did you mean Tensor<f32, 784, 256>?`,
    note: "Zero shape bugs reach production. The compiler catches them all.",
  },
  {
    title: "Autodiff",
    pytorch: `# Runtime autograd tape
x = torch.randn(32, 784, requires_grad=True)
y = model(x)
loss = criterion(y, target)
loss.backward()  # Builds + walks tape at runtime
optimizer.step()`,
    mind: `// Compile-time gradient generation
@grad
fn train_step(x: Tensor<f32, ?, 784>, target: Tensor<f32, ?, 10>, lr: f32) -> Tensor<f32, 1> {
    let pred = forward(x)
    let loss = cross_entropy(pred, target)
    // Gradients fused into compiled kernel
    for param in parameters {
        param = sub(param, mul_scalar(grad(loss, param), lr))
    }
    loss
}`,
    note: "MIND's @grad compiles gradients at build time. The optimizer sees the full graph and fuses ops. 1,300x faster on benchmarks.",
  },
  {
    title: "Linear Layer",
    pytorch: `import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 256)
        self.fc2 = nn.Linear(256, 10)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)`,
    mind: `module mlp

param W1: Tensor<f32, 784, 256>
param b1: Tensor<f32, 256>
param W2: Tensor<f32, 256, 10>
param b2: Tensor<f32, 10>

fn forward(x: Tensor<f32, ?, 784>) -> Tensor<f32, ?, 10> {
    let h = relu(add(matmul(x, W1), broadcast(b1, [?, 256])))
    add(matmul(h, W2), broadcast(b2, [?, 10]))
}`,
    note: "Explicit parameter tensors instead of opaque Module objects. Every shape is visible and verified.",
  },
  {
    title: "Conv2d",
    pytorch: `conv = nn.Conv2d(1, 16, kernel_size=3, padding=1)
pool = nn.MaxPool2d(2)

def forward(x):
    # x: [B, 1, 28, 28]
    x = pool(torch.relu(conv(x)))
    # x: [B, 16, 14, 14]
    return x`,
    mind: `param conv_w: Tensor<f32, 3, 3, 1, 16>  // [H, W, C_in, C_out]
param conv_b: Tensor<f32, 16>

fn forward(x: Tensor<f32, ?, 28, 28, 1>) -> Tensor<f32, ?, 14, 14, 16> {
    let c = conv2d(x, conv_w, stride=[1,1], padding="same")
    let c = add(c, broadcast(conv_b, shape(c)))
    let c = relu(c)
    pool2d(c, kernel=[2,2], stride=[2,2], mode="max")
    // Output shape [?, 14, 14, 16] verified at compile time
}`,
    note: "MIND uses NHWC format. Output shape is part of the function signature — the compiler verifies the pooling output matches.",
  },
  {
    title: "Model Export",
    pytorch: `# Multiple export paths, each with quirks
torch.onnx.export(model, dummy_input, "model.onnx")
traced = torch.jit.trace(model, dummy_input)
traced.save("model.pt")
# TensorRT, CoreML, etc. each need separate conversion`,
    mind: `# Single source, multiple targets
mindc build model.mind                    # CPU binary
mindc build model.mind --target cuda      # GPU binary
mindc build model.mind --target metal     # Metal binary
mindc build model.mind --export onnx      # ONNX file
# Same semantics, same output. No translation bugs.`,
    note: "No rewrite needed. The compiler handles target-specific code generation from the same source.",
  },
];

const honestTable = [
  { feature: "Tensor operations (matmul, conv2d, etc.)", maps: true, notes: "Full coverage" },
  { feature: "Shape-checked tensors", maps: true, notes: "Compile-time (vs runtime)" },
  { feature: "Autograd / autodiff", maps: true, notes: "Compile-time @grad" },
  { feature: "Custom CUDA kernels", maps: true, notes: "Via CUDA backend" },
  { feature: "Dynamic computation graphs", maps: false, notes: "MIND is static-graph" },
  { feature: "Eager execution / REPL", maps: false, notes: "Compiled, not interpreted" },
  { feature: "Python ecosystem (pandas, sklearn)", maps: false, notes: "MIND has its own stdlib" },
  { feature: "Pre-trained model zoo (HuggingFace)", maps: false, notes: "Requires reimplementation" },
  { feature: "Distributed training (DDP)", maps: true, notes: "NCCL backend" },
  { feature: "Model serving", maps: true, notes: "Built-in HTTP/gRPC" },
];

const effortEstimates = [
  { complexity: "Simple model (linear, MLP)", effort: "1-2 hours", loc: "50-100 lines" },
  { complexity: "Medium model (CNN, RNN)", effort: "2-4 hours", loc: "100-300 lines" },
  { complexity: "Complex model (Transformer)", effort: "4-8 hours", loc: "300-600 lines" },
  { complexity: "Full training pipeline", effort: "1-2 days", loc: "500-1000 lines" },
];

export default function MigrationPage() {
  return (
    <>
      <section className="hero !py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="!mb-6">Migration Guide: PyTorch to MIND</h1>
            <p className="hero-lede">
              Side-by-side examples showing how PyTorch patterns map to MIND.
              Every comparison highlights what MIND catches at compile time that
              PyTorch only finds at runtime.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl mx-auto space-y-12">
          {comparisons.map((cmp) => (
            <div key={cmp.title}>
              <h2 className="text-2xl font-bold mb-4">{cmp.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs font-bold text-muted mb-1 uppercase tracking-wider">
                    PyTorch
                  </div>
                  <pre className="bg-[var(--bg-code)] text-[var(--text-code)] p-4 rounded-lg overflow-x-auto text-sm leading-relaxed h-full">
                    <code>{cmp.pytorch}</code>
                  </pre>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                    MIND
                  </div>
                  <pre className="bg-[var(--bg-code)] text-[var(--text-code)] p-4 rounded-lg overflow-x-auto text-sm leading-relaxed border border-primary/20 h-full">
                    <code>{cmp.mind}</code>
                  </pre>
                </div>
              </div>
              <p className="text-sm text-muted italic">{cmp.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">What Maps, What Doesn&apos;t</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4 w-24">Maps?</th>
                    <th className="text-left py-3 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {honestTable.map((row) => (
                    <tr key={row.feature} className="border-b">
                      <td className="py-3 px-4">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {row.maps ? (
                          <span className="text-green-600 font-bold">Yes</span>
                        ) : (
                          <span className="text-red-600 font-bold">No</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-8">Estimated Migration Effort</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Model Complexity</th>
                    <th className="text-left py-3 px-4">Effort</th>
                    <th className="text-left py-3 px-4">MIND LOC</th>
                  </tr>
                </thead>
                <tbody>
                  {effortEstimates.map((row) => (
                    <tr key={row.complexity} className="border-b">
                      <td className="py-3 px-4">{row.complexity}</td>
                      <td className="py-3 px-4">{row.effort}</td>
                      <td className="py-3 px-4 text-muted">{row.loc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary/5">
        <div className="container text-center">
          <h2 className="mb-4">Need Help Migrating?</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Our pilot program includes hands-on migration support. We&apos;ll
            help you port your first model and verify compliance artifacts.
          </p>
          <Link
            href="/pilot"
            className="btn btn--primary inline-flex items-center gap-2"
          >
            Start a Pilot <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
