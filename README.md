# mindlang.dev

This repository hosts **mindlang.dev**, the public documentation site for the
MIND language, compiler, and **Core v1** specification.

The site aggregates:

- High-level introductions to the MIND project and roadmap.
- The Core v1 language, IR, autodiff, shapes, runtime, and MLIR-lowering
  documentation (mirroring the normative specs in `cputer/mind-spec`).
- Stability & Versioning guidance for users integrating the MIND toolchain.

Related repositories
--------------------

- **Compiler & runtime**:
  <https://github.com/cputer/mind>

- **Core v1 specification**:
  <https://github.com/cputer/mind-spec>

These repos define the public behaviour of the compiler and Core IR; this site
provides the user-facing documentation and navigation around them.

Documentation structure
-----------------------

The content is organised into several sections:

- **Getting Started** – entry points for new users and links to key docs.
- **Core v1** – surface language, IR, autodiff, shapes, runtime and MLIR
  lowering chapters aligned with the current public implementation
  (corresponding to “Phase-2” as described in the project roadmap in
  `cputer/mind`).
- **Stability & Versioning** – a description of which parts of the stack are
  considered stable, conditionally stable, or experimental, with links back to
  the versioning and error-model docs in `cputer/mind`.
- **Roadmap** – a high-level view of completed work (Core v1, CPU execution)
  and upcoming items (GPU / accelerator backends, package tooling, etc.).

Local development
-----------------

The site is built as a static web application. To work on it locally:

```bash
npm install
npm run dev     # start local dev server

# or build the static site
npm run build
```

The exact commands may vary slightly depending on the chosen build toolchain,
but the project is designed to follow the standard Node.js workflow for static
documentation sites.

Templates and components
------------------------

The `src/` tree still contains generic starter templates and components from
the original theme. They are intentionally **kept** as a design and layout
toolbox and may be customised or replaced over time. This change only cleans up
the textual documentation; it does not remove any templates, layouts, or other
source files.

License
-------

This repository inherits its license from the main MIND project. See the
`LICENSE` file at the root of the repository for details.
