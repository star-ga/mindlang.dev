---
title: Conformance
layout: layouts/docs.njk
description: Core v1 conformance profiles for CPU and GPU implementations, plus instructions for running the official test suite.
---

# Core v1 Conformance

<p style="font-size: 1.15rem; color: #475569; margin-bottom: 1.5rem;">
  Core v1 defines compatibility expectations for runtimes targeting the MIND IR. This page explains the CPU and GPU profiles and
  shows how to run the official conformance suite.
</p>

## Core v1 CPU baseline
- Guarantees deterministic execution for the full Core v1 op set on CPU, including shape inference, gradients, and canonical rewriting behavior.
- Conformance expectations are defined in the Core spec under <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/conformance.md" target="_blank" rel="noopener">conformance.md</a>, with runtime behavior documented in <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/runtime.md" target="_blank" rel="noopener">runtime.md</a>.
- Run the official suite locally with the CPU profile: `mindc conformance --profile cpu`.

## Core v1 GPU profile
- Optional profile for implementations that expose GPU or accelerator devices while staying compatible with the Core v1 IR.
- Defines the device kinds/backends contract, backend-selection error model, and the public `GPUBackend` surface; see the "Devices and backends" section of <a href="https://github.com/cputer/mind-spec/blob/main/spec/v1.0/runtime.md#devices-and-backends" target="_blank" rel="noopener">runtime.md</a>.
- Profile guarantees cover capability reporting and deterministic fallback/error semantics even when concrete GPU backends vary by platform.

## Running the conformance suite
- From the <code>cputer/mind</code> repo, run the Rust test harness:
  ```bash
  cargo test -p mind-compiler --test conformance
  ```
- From any environment with <code>mindc</code> installed, run:
  ```bash
  mindc conformance --profile cpu
  mindc conformance --profile gpu
  ```
- The suite executes both IR-level and runtime-level assertions for the selected profile.

## For other implementations
- The conformance corpus is intended to be reused—port the tests to your runtime or run them through a compatibility shim.
- Opening issues or PRs against <a href="https://github.com/cputer/mind-spec" target="_blank" rel="noopener">mind-spec</a> is the best way to clarify expectations or request new fixtures.
