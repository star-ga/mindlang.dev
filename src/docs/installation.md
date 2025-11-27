<!--
Copyright 2025 STARGA Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

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
* GLIBC 2.27+

### One-Line Install
The easiest way to install MIND is via our official installer script:

<div style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
  curl --proto '=https' --tlsv1.2 -sSf https://get.mindlang.dev | sh
</div>

### Verifying Installation
Restart your terminal and run:

<div style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem;">
  mind --version
</div>
