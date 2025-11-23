---
layout: layouts/docs.njk
title: MIND Language Specification
description: Official specification and guides for MIND.
---

# MIND Language Specification

<p class="lead" style="font-size: 1.25rem; color: #475569; margin-bottom: 2rem;">
  Welcome to the MIND Specification, the authoritative reference for the MIND programming language and runtime model.
</p>

<p>
  This specification defines the core semantics, syntax, and typing rules for MIND, including its autodiff-enabled execution model and tensor algebra extensions.
</p>

<h3>📖 Purpose</h3>
<p>The goal of this specification is to provide a stable foundation for:</p>
<ul>
  <li>Compiler and runtime implementors.</li>
  <li>Contributors proposing extensions via RFCs.</li>
  <li>Researchers and integrators targeting MIND’s intermediate representation (MIR/MLIR).</li>
</ul>

<h3>🧩 Specification Structure</h3>
<table>
  <thead>
    <tr>
      <th>Section</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Language Core</strong></td>
      <td>Syntax, type system, and evaluation semantics.</td>
    </tr>
    <tr>
      <td><strong>Semantics</strong></td>
      <td>Runtime and compile-time behavior, diagnostics, and safety.</td>
    </tr>
    <tr>
      <td><strong>Design Docs</strong></td>
      <td>Internal architecture, autodiff engine, and optimizer design.</td>
    </tr>
    <tr>
      <td><strong>RFCs</strong></td>
      <td>Proposed or implemented extensions to the language.</td>
    </tr>
  </tbody>
</table>

<h3>🚀 Status</h3>
<ul>
  <li><strong>Spec version:</strong> v1.0-draft</li>
  <li><strong>Language tag:</strong> mind-2025a</li>
  <li><strong>Last update:</strong> Auto-populated from CI build timestamp</li>
</ul>

<h3>📚 Related Projects</h3>
<table>
  <thead>
    <tr>
      <th>Repo</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/cputer/mind" target="_blank" class="text-indigo-600 hover:underline">cputer/mind</a></td>
      <td>Public compiler + CLI (front-end).</td>
    </tr>
    <tr>
      <td><code>cputer/mind-runtime</code></td>
      <td>Private runtime backend (MLIR, GPU, autodiff).</td>
    </tr>
    <tr>
      <td><a href="https://github.com/cputer/mind-spec" target="_blank" class="text-indigo-600 hover:underline">cputer/mind-spec</a></td>
      <td>This specification and design docs.</td>
    </tr>
  </tbody>
</table>

<div style="background-color: #eef2ff; border-left: 4px solid #4f46e5; padding: 1rem; margin: 2rem 0; border-radius: 0 0.25rem 0.25rem 0;">
  <p style="color: #312e81; margin: 0; font-size: 0.9rem;">
    <strong>🧩 Tip:</strong> Use the sidebar to navigate the spec modules. All documents are Markdown-based and auto-rendered.
  </p>
</div>
