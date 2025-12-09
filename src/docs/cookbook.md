---
title: Cookbook
layout: layouts/docs.njk
---
# MIND Core v1 Cookbook

A collection of short, practical recipes demonstrating how to use Core v1 in real workflows.

Each example is fully aligned with:
- Core v1 spec  
- `mindc` compiler  
- Core autodiff rules  
- CPU runtime baseline  
- GPU profile contract  

---

## Recipe 1 — Simple arithmetic (CPU)

File:

```
fn main(x: tensor<f32>[4]) -> tensor<f32>[4] { return x * 2.0 }
```

Run:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc scale.mind -o scale.ir
runtime run scale.ir --input x=[1,2,3,4]
</pre>

---

## Recipe 2 — Autodiff of a loss function

```
fn main(x: tensor<f32>[3]) -> tensor<f32>[1] {
  let y = sum(x * x)
  return y
}
```

Gradient IR:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc loss.mind --grad --func main -o loss.grad.ir
</pre>

Expected gradient: `2 * x`.

---

## Recipe 3 — MLIR lowering for CPU

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc scale.mind --mlir -o scale.mlir
</pre>

Output uses:
- `func.func`
- `tensor` dialect operations
- deterministic CPU lowering rules

---

## Recipe 4 — GPU profile: correct error handling

Attempting to run a GPU-targeted program without a GPU backend:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc main.mind --target gpu
</pre>

Expected result (Core v1-stable):

```
error[runtime]: backend 'gpu' unavailable
```

This is required by the GPU profile conformance.

---

## Recipe 5 — Host embedding via the runtime API

This shows how a host application interacts with the Core v1 runtime.

Rust:

```rust
let rt = MindRuntime::new_cpu()?;
let inp = rt.allocate(&tensor_desc_f32(&[2]))?;
rt.write_tensor(inp, &[1.0, 3.0])?;

let out = rt.allocate(&tensor_desc_f32(&[1]))?;
MindRuntime::run_op(&rt, "sum", &[inp], &[out])?;

let result = rt.read_tensor(out)?;
```

Output: `4.0`.

---

## Recipe 6 — Running the official conformance suite

CPU baseline:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc conformance --profile cpu
</pre>

GPU profile:

<pre style="background:#0f172a;color:#f8fafc;padding:1rem;border-radius:6px;">
mindc conformance --profile gpu
</pre>

This verifies your entire toolchain meets the Core v1 standard.
