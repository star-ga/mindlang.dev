---
title: Shapes & Broadcasting
description: Core v1 shapes, broadcasting rules, and the reference shape engine.
---

<div class="prose max-w-3xl">

# Shapes & Broadcasting

Core v1 treats tensor shapes as ordered lists of extents. This page explains the
practical rules used by the compiler and runtime when reasoning about shapes:

- how ranks and shapes are represented;
- how elementwise operators broadcast their inputs;
- how full reductions and 2D matrix multiplication behave; and
- where the reference shape engine lives in the codebase.

For the normative definition, see the Core v1 shapes chapter in
[`cputer/mind-spec`](https://github.com/cputer/mind-spec/blob/main/spec/v1.0/shapes.md).

## Ranks and shapes

- Scalars are rank-0 tensors with an empty shape `[]`.
- Vectors and matrices are rank-1 and rank-2 respectively.
- Higher-rank tensors are just longer shape lists, for example `[2, 3, 4]`.

Core v1 focuses on fully-known shapes; symbolic or dynamic dimensions are out
of scope for the baseline profile.

## Broadcasting in practice

Most Core v1 operators are **elementwise** and follow numpy-style broadcasting:

- shapes are aligned from the right;
- each dimension must either match or be `1` on one side;
- if neither side is `1` and the extents differ, broadcasting fails.

The reference implementation exposes the helper:

```rust
use mind::shapes::engine::broadcast_shapes;

let a = [2, 3];
let b = [1, 3];
let out = broadcast_shapes(&a, &b).unwrap();
assert_eq!(out, vec![2, 3]);
```

When broadcasting fails, the engine returns a structured error that callers can
turn into diagnostics or runtime errors.

## Shape rules by operator kind

Core v1 groups operators into a few shape rule categories:

- **Unary elementwise** (e.g. `tensor.relu`, `tensor.exp`): output shape equals
  input shape.
- **Binary elementwise** (e.g. `tensor.add`, `tensor.mul`): output shape is the
  broadcasted shape of the two inputs.
- **Full reduction** (`tensor.sum_all`): reduces all axes to a scalar
  (`[]`), regardless of input rank.
- **2D matmul** (`tensor.matmul`): both inputs must be rank-2, and shapes must
  satisfy `A: [M, K]`, `B: [K, N]`, producing `[M, N]`.

The Core v1 shapes spec describes these rules in more detail. The reference
engine encodes them in a small API that can be reused by both the compiler and
tests.

## Reference shape engine

The reference shape engine lives in the main compiler repository:

- module: `mind::shapes::engine`
- tests: `tests/shapes_engine.rs`

It provides:

- a mapping from operator name (e.g. `"tensor.add"`) to a **shape rule kind**
  (unary elementwise, binary elementwise, full reduction, 2D matmul);
- a `broadcast_shapes` helper that implements the broadcasting rules described
  above; and
- an `infer_output_shape` function that returns either an output shape or a
  structured `ShapeError`.

Other implementations do not have to use this exact engine, but the Core v1
conformance story assumes that equivalent inputs produce the same output shapes
or the same class of shape errors.

</div>
