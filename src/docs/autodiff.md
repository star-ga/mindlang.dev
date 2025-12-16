---
title: Autodiff Engine
layout: layouts/docs.njk
description: Reverse-mode autodiff rules aligned with mind-spec Core IR.
---

<div class="prose max-w-3xl">

# Autodiff Engine

This page summarizes the autodiff contract from [`cputer/mind-spec`](https://github.com/cputer/mind-spec),
focusing on matrix multiplication, broadcasting semantics, and the tensor
operators supported by the Core v1 reverse-mode engine.

## Reverse-mode fundamentals

- Graphs are differentiated in reverse topological order.
- Each primal operation defines a gradient rule that produces cotangents for its
  inputs using the cotangent of its output.
- Gradients preserve the Core IR typing rules: every cotangent matches the shape
  and dtype of its associated primal value.

## Matmul gradients

For `C = matmul(A, B)` with shapes `[*batch, M, K]` and `[*batch, K, N]`:

- `dA = matmul(dC, transpose(B))` with shape `[*batch, M, K]`.
- `dB = matmul(transpose(A), dC)` with shape `[*batch, K, N]`.
- Batch prefixes broadcast exactly as in the forward pass; if `A` or `B` was
  broadcast over a batch dimension of size `1`, the corresponding gradient is
  reduced (summed) over that dimension before being consumed.

## Broadcast-aware gradients

When an operand was broadcast in the forward pass, its gradient is reduced over
those broadcasted axes:

- Identify axes where the operand had extent `1` but the output had a larger
  extent.
- Sum-reduce the incoming cotangent along those axes to restore the original
  operand shape.
- The resulting gradient matches the operand shape exactly, keeping Core IR type
  invariants intact.

## Supported tensor operations

The Core autodiff engine covers the tensor surface area defined in mind-spec:

- **Unary elementwise:** `neg`, `exp`, `log`, `relu`, `sqrt`, etc.
- **Binary elementwise:** `add`, `sub`, `mul`, `div`, `maximum`, `minimum`, all
  broadcast-aware.
- **Reductions:** full-sum and mean variants reduce to scalars and produce scalar
  cotangents that are expanded or broadcast to input shapes.
- **Linear algebra:** `matmul` and `transpose` participate in gradient
  propagation as shown above.

Implementations may extend the rule set, but conformance requires these rules to
match the reference formulas in mind-spec.

</div>
