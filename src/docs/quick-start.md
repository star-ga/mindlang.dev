---
title: Quick Start
layout: layouts/docs.njk
---
# Quick Start

<p style="font-size: 1.25rem; color: #475569; margin-bottom: 2rem;">
  Write and run your first Tensor program in 5 minutes.
</p>

### 1. Clone & build the compiler
Use the public compiler repo and build the CLI from source:

<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
git clone https://github.com/cputer/mind.git
cd mind
cargo build --bin mindc
</pre>

### 2. Inspect the sample program
The repository ships with <code>examples/hello_tensor.mind</code>. You can emit the typed SSA IR directly from the CLI:

<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
cargo run --bin mindc -- examples/hello_tensor.mind --emit-ir
</pre>

### 3. Different compiler outputs
Generate gradient IR or MLIR using the same example and feature flags:

<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
# Gradient IR for main()
cargo run --bin mindc -- examples/hello_tensor.mind --func main --autodiff --emit-grad-ir

# MLIR lowering (feature-gated)
cargo run --features "mlir-lowering autodiff" --bin mindc -- examples/hello_tensor.mind --func main --autodiff --emit-mlir
</pre>
