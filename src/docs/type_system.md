---
title: Type System
layout: layouts/docs.njk
description: Type validation rules for shapes and dtypes as defined in mind-spec.
---

<div class="prose max-w-3xl">

# Type System

The Core type system from [`cputer/mind-spec`](https://github.com/cputer/mind-spec)
ensures tensors are shape- and dtype-correct before execution. This section
summarizes the validation rules with emphasis on matrix multiplication and
broadcast-aware operators.

## Shapes

- Tensor types are written as `tensor<[d0, d1, ...], dtype>` with fully-known
  extents in Core v1.
- Elementwise ops require their operands to broadcast successfully; otherwise the
  program is rejected at type-check time.
- Reductions specify exactly which axes are removed; full reductions yield the
  scalar shape `[]`.

## Dtypes

- Arithmetic and comparison operators require numeric dtypes; boolean tensors are
  restricted to logical operators.
- Binary elementwise ops require operands to share the same dtype. Mixed-dtype
  promotion is not part of the baseline profile.
- Matmul inputs must share the same floating-point or integer dtype. The result
  carries the same dtype, and gradients (when present) share it as well.

## Matmul dimension checks

For `A: tensor<[*batch, M, K], T>` and `B: tensor<[*batch, K, N], T>`:

- Ranks must be at least 2. Higher-rank tensors are permitted through batch
  prefixes.
- The `K` dimension must match exactly between operands.
- Batch prefixes `*batch` must broadcast following NumPy semantics. A mismatch
  triggers a type error before lowering proceeds.
- The output type is `tensor<[broadcast(*batch), M, N], T>`.

## Diagnostic model

Type validation surfaces structured errors that align with the conformance suite
(categories such as `MismatchedRank`, `BroadcastFailure`, and `DtypeMismatch`).
Frontends are expected to render these as user-facing diagnostics while
preserving the error kind for automated checks.

</div>
