---
title: Shapes & Broadcasting (Core IR)
layout: layouts/docs.njk
description: NumPy-style broadcasting, tensor validation, and batched matmul rules from mind-spec.
---

<div class="prose max-w-3xl">

# Shapes & Broadcasting

The mind-spec Core IR adopts NumPy-style broadcasting. This page documents the
rules, validation surfaces, and the batched matrix multiplication contract used
by the compiler and runtime.

## NumPy-style broadcasting

- Align shapes from the right; missing leading dimensions are treated as `1`.
- A dimension is compatible when it matches or one side is `1`.
- The broadcasted extent is the maximum of each aligned pair.
- If neither extent is `1` and they differ, broadcasting fails and the program is
  rejected.

## Tensor shape validation

- **Unary elementwise:** output shape equals input shape.
- **Binary elementwise:** output shape is the broadcast of the two operands; the
  compiler inserts implicit expands but never reshapes data.
- **Reductions:** full reductions always return `[]`; partial reductions are
  reported with explicit axis lists in mind-spec but are out of scope for Core
  v1’s baseline profile.
- Shape errors carry structured reasons (`BroadcastFailure`, `MismatchedRank`,
  `InvalidReductionAxis`, etc.) so implementations can preserve diagnostics.

## Batched matmul

`tensor.matmul` supports optional batch prefixes and respects broadcasting:

- Inputs must be rank-2 or higher. Shapes are written as `A: [*batch, M, K]` and
  `B: [*batch, K, N]`.
- Batch prefixes `*batch` broadcast using the same rules as elementwise ops; any
  incompatibility produces a shape error before execution.
- The output shape is `broadcast(*batch) + [M, N]`.
- Gradients reuse the same broadcasting contract, reducing over broadcasted
  batch dimensions when computing `dA` or `dB`.

</div>
