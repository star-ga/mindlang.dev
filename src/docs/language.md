---
title: Language Constructs
layout: layouts/docs.njk
description: Language-to-IR lowering pipeline and type inference aligned with mind-spec.
---

<div class="prose max-w-3xl">

# Language Constructs

The `mind` front-end lowers high-level expressions into the Core IR defined in
[`cputer/mind-spec`](https://github.com/cputer/mind-spec). This page highlights
how binary expressions and type inference map into validated IR operations.

## Language-to-IR pipeline

1. **Parsing:** Source code is parsed into a typed AST with explicit operator
   nodes for arithmetic, comparison, and matrix operations.
2. **Type inference:** The AST is annotated with `tensor<shape, dtype>` types
   using the shape and dtype rules from the Core type system. Broadcastability is
   checked here so diagnostics can be surfaced early.
3. **Lowering to IR:** Typed AST nodes are converted to Core IR ops in SSA form.
   Binary expressions lower to the appropriate tensor operation with operands in
   evaluation order.
4. **Validation:** The resulting IR module is re-validated using the same shape
   and dtype rules to ensure front-end and IR invariants agree.

## Binary operations

- **Elementwise arithmetic (`+`, `-`, `*`, `/`):** Lower to `tensor.add`,
  `tensor.sub`, `tensor.mul`, or `tensor.div` with NumPy-style broadcasting. If
  operands cannot broadcast, the front-end emits a `BroadcastFailure` diagnostic
  before lowering.
- **Comparisons:** Lower to boolean tensor ops using the same broadcasting engine
  as arithmetic operators. Dtype constraints follow the Core type system.
- **Matrix multiplication (`@`):** Lowers to `tensor.matmul`, requiring operands
  with compatible batch prefixes and inner dimensions. The lowering step computes
  the result shape `broadcast(*batch) + [M, N]` and records it on the IR value.

## Type inference details

- Shapes are propagated through expression trees using the shape engine: unary
  ops preserve shape; binary ops broadcast; matmul uses `[M, K] x [K, N] → [M, N]`
  with optional batch prefixes.
- Dtypes are enforced to match across binary operators; implicit promotion is not
  performed in the baseline spec.
- When inference fails, the compiler emits typed diagnostics and skips lowering
  that expression, preventing malformed IR from reaching later passes.

</div>
