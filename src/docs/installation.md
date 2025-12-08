---
title: Installation
layout: layouts/docs.njk
---
# Installation

<p style="font-size: 1.25rem; color: #475569; margin-bottom: 2rem;">
  Get up and running with the MIND compiler toolchain.
</p>

### Prerequisites
* Linux (x86_64) or macOS (Apple Silicon/Intel)
* Rust toolchain (stable), <code>cmake</code>, and a modern C/C++ toolchain

### Build from source
The compiler and CLI live in the public <code>cputer/mind</code> repository.

<div style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
  git clone https://github.com/cputer/mind.git
  cd mind
  cargo build --bin mindc
</div>

### Verifying the build
Run the compiled binary to confirm it links correctly:

<div style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem;">
  cargo run --bin mindc -- --help
</div>
