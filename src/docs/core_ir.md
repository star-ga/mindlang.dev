---
title: Core IR
layout: layouts/docs.njk
description: SSA-based Core IR definition mirrored from the mind-spec repository.
---

<div class="prose max-w-3xl">

# Core IR (mind-spec)

The Core IR defined in [`cputer/mind-spec`](https://github.com/cputer/mind-spec)
models MIND programs as SSA graphs composed of functions, basic blocks, and
typed values. This page mirrors the latest Core IR rules with a focus on
validation of matrix operations and broadcasting-aware tensor semantics.

## IR structure

- **Modules and functions:** Each module declares exported and internal
  functions. Functions are sequences of basic blocks with explicit parameters
  and SSA values.
- **Blocks and control flow:** Blocks terminate with `return` or `br`/`cond_br`
  terminators. All predecessors must supply arguments that match the block
  signature.
- **Values and types:** SSA values carry tensor types (`tensor<shape, dtype>`) or
  scalars. Types are validated eagerly so that shape- and dtype-invalid graphs
  are rejected before execution.

## Matmul validation

`tensor.matmul` follows the Core IR matrix multiplication contract:

- Inputs must be at least rank-2 tensors. Let `A` have shape `[*batch, M, K]`
  and `B` have shape `[*batch, K, N]` where `*batch` is an optional broadcasted
  prefix.
- The inner dimensions `K` must match exactly. If either operand supplies a `1`
  in a batch position, the batch shapes broadcast following NumPy rules.
- The result shape is `broadcast(*batch) + [M, N]`. Validation fails with a
  shape error when batch prefixes cannot broadcast or when either operand is
  rank-1.

## Broadcasting rules

Elementwise operators (`tensor.add`, `tensor.mul`, `tensor.maximum`, etc.) share
one broadcasting engine:

- Shapes are aligned from the right. A dimension of `1` on either side expands
  to the larger extent.
- If both extents differ and neither is `1`, the program is rejected at
  validation time.
- The output shape is the broadcasted shape; operands are implicitly expanded
  but never reshape data.

## Shape validation

The Core IR performs per-op shape validation before a graph is considered
well-formed:

- **Unary elementwise:** output shape equals input shape.
- **Binary elementwise:** output shape is computed by broadcasting the two input
  shapes.
- **Reductions:** full reductions (e.g., `tensor.sum_all`) return scalars `[]`.
- **Matmul:** enforced as described above, including batch and inner-dimension
  compatibility checks.
- **Reshape-like ops:** must preserve the total element count. Static shape
  lists are required in Core v1.

Violations produce structured diagnostics that match the error categories in the
mind-spec conformance suite.

</div>
