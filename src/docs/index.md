---
layout: layouts/docs.njk
title: Introduction
description: Official specification and guides for MIND.
---

# Introduction

<p class="lead">
  Welcome to the official documentation for <strong>MIND</strong>, the native language for AI engineering. 
  MIND is designed to bridge the gap between high-level ML frameworks and bare-metal performance.
</p>

<h3>Why MIND?</h3>
<p>
  Modern AI development is fragmented. Researchers use Python/PyTorch, while engineers rewrite logic in C++/CUDA for production.
  MIND unifies this workflow into a single, tensor-native language.
</p>

<ul>
  <li><strong>Tensor-Native:</strong> Matrix operations are first-class primitives.</li>
  <li><strong>Zero-Overhead:</strong> Compiles directly to machine code via LLVM/MLIR.</li>
  <li><strong>Safe:</strong> Rust-inspired ownership model for memory safety without a GC.</li>
</ul>

<div style="background-color: #eef2ff; border-left: 4px solid #4f46e5; padding: 1rem; margin: 2rem 0; border-radius: 0 0.25rem 0.25rem 0;">
  <p style="color: #312e81; margin: 0; font-size: 0.9rem;">
    <strong>Note:</strong> MIND is currently in active alpha. APIs are subject to change.
  </p>
</div>

<h3>Next Steps</h3>
<p>
  Ready to dive in? Check out the <a href="/docs/getting-started/">Getting Started</a> guide to install the compiler.
</p>
