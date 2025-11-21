---
title: Intelligence, Compiled.
headline: MIND Language
btns:
  - caption: Get Started
    url: /docs/
    type: regular
  - caption: View on GitHub
    url: https://github.com/cputer/mind
    type: outline
summary: MIND is a small, focused language for tensors, automatic differentiation, and MLIR-based compilation.
displaySummary: true
layout: "layouts/front-page.html"
overview:
  - title: First-class Tensors
    url: /docs/
    description: Built-in types with shape & dtype safety. No more runtime guessing.
  - title: Native Autodiff
    url: /docs/
    description: grad() is a keyword, not a library function. Reverse-mode automatic differentiation baked into the evaluator.
  - title: MLIR Execution
    url: /docs/
    description: Compiles to machine code via LLVM/MLIR. Interpreters, JIT, CPU backends, and AOT builds.
faqs:
-
    title: "Why MIND?"
    description: "Most languages treat tensors and autodiff as external libraries. MIND bakes them into the core, allowing you to reason about models as first-class programs instead of opaque framework graphs."
-
    title: "Who Is This For?"
    description: "Researchers and systems engineers building intelligent applications who want transparency, control, and performance without sacrificing expressiveness."
-
    title: "How Do I Get Started?"
    description: "Clone the repository, build with Cargo, and run your first MIND program. Full documentation and examples are available in the Getting Started guide."
-
    title: "Is MIND Production-Ready?"
    description: "MIND is actively developed. Early adopters are welcome. Join the community to contribute, report issues, and help shape the language."
---
