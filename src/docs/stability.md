---
title: Stability & Versioning
layout: layouts/docs.njk
description: Stability guarantees for the MIND IR, autodiff, shapes, and experimental areas like GPU and package manager.
---

# Stability & Versioning

<p style="font-size: 1.15rem; color: #475569; margin-bottom: 1.5rem;">
  This page summarizes which parts of the MIND toolchain are production-stable today and which remain experimental while the ecosystem evolves.
</p>

## Stable
- **Core IR (mind-spec Core v1):** The SSA-based core IR defined in <a href="https://github.com/cputer/mind-spec/tree/main/spec/v1.0" target="_blank" rel="noopener">mind-spec/spec/v1.0</a> is locked for compatibility guarantees.
- **Autodiff:** Reverse-mode differentiation over the core IR with deterministic gradient IR output and verifier coverage.
- **Shapes & broadcasting:** Shape inference, static shapes, and broadcasting semantics are fixed for 1.0.
- **Deterministic canonicalization:** Canonical forms and rewrite ordering are stable to enable reproducible builds.

## Conditionally Stable
- **MLIR lowering (feature-gated):** Available behind compiler feature flags; interfaces may change as the lowering pipeline matures.

## Experimental
- **GPU backend:** Accelerated codegen remains in design and is subject to rapid iteration.
- **Package manager:** Dependency resolution and registry workflows are not finalized.
- **Future ops / extensions:** New operators and language extensions will ship behind experimental flags until promoted.

## References
- Core IR and semantics: <a href="https://github.com/cputer/mind-spec/tree/main/spec/v1.0" target="_blank" rel="noopener">mind-spec/spec/v1.0</a>
- Versioning policy and guarantees: <a href="https://github.com/cputer/mind/blob/main/docs/versioning.md" target="_blank" rel="noopener">cputer/mind/docs/versioning.md</a>

<div style="background: #eef2ff; border-left: 4px solid #4f46e5; padding: 1rem; margin-top: 2rem; border-radius: 0 0.375rem 0.375rem 0; color: #312e81;">
  <strong>Tip:</strong> Experimental areas may change without notice; feature flags are required for MLIR lowering and upcoming GPU support.
</div>
