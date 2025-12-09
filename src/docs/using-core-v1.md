---
title: Using Core v1 Today
layout: layouts/docs.njk
---
# Using MIND Core v1 Today

This page gives a **practical, end-to-end guide** to using the MIND Core v1 toolchain: surface language → IR → autodiff → MLIR → CPU runtime → conformance.

It complements the formal Core v1 specification and stability guarantees.

---

## 1. Installing `mindc`

### From source
Clone and build:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
git clone https://github.com/cputer/mind.git
cargo build --release
./target/release/mindc --help
</pre>

### Validating installation

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc --version
mindc --stability
</pre>

Both commands reflect the published Core v1 stability & versioning contract.

---

## 2. Writing your first Core v1 program

Create a file `simple.mind`:

```
fn main(x: tensor<f32>[2, 2]) -> tensor<f32>[2, 2] {
  let y = x + x
  return y
}
```

Compile to IR:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc simple.mind -o simple.ir
</pre>

---

## 3. Running through the CPU runtime

Use the runtime CLI (from `mind-runtime` repo):

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
runtime run simple.ir --input x=[1,2,3,4]
</pre>

Expected output:

```
[[2,4],[6,8]]
```

This demonstrates the Core v1 **deterministic CPU execution model**.

---

## 4. Using autodiff

Extend the same `simple.mind` file:

```
fn main(x: tensor<f32>[2]) -> tensor<f32>[1] {
  let y = sum(x)
  return y
}
```

Generate gradient IR:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc simple.mind --grad --func main -o grad.ir
</pre>

This produces a fully canonical reverse-mode derivative according to Core v1 autodiff semantics.

---

## 5. Lowering to MLIR (CPU backend)

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc main.mind --mlir -o main.mlir
</pre>

MLIR lowering follows the Core v1 MLIR lowering specification and is covered by conformance tests.

---

## 6. Using the GPU profile (optional)

The Core v1 GPU profile defines the **contract** for:
- device kinds,
- backend targets,
- backend-unavailable error semantics,
- the `GPUBackend` trait surface.

GPU backends are optional; if your system has none:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc main.mind --target gpu
</pre>

Expected (stable) Core v1 error:

```
error[runtime]: backend 'gpu' unavailable
```

This is part of Core v1 stability.

---

## 7. Verifying conformance

### CPU baseline

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc conformance --profile cpu
</pre>

### GPU profile

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc conformance --profile gpu
</pre>

Conformance verifies:
- IR generation  
- autodiff  
- MLIR lowering  
- runtime CPU semantics  
- GPU profile error model (if GPU is unavailable or unimplemented)  

This is the official compatibility validator for any Core v1 implementation.

---

## What to read next

- **Cookbook** (real examples) → `/docs/cookbook/`  
- **Conformance** → `/docs/conformance/`
- **Stability & Versioning** → `/docs/stability/`
- **Core v1 Spec** → `/docs/spec/`
