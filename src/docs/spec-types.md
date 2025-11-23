---
title: Types & Variables
layout: layouts/docs.njk
permalink: /docs/spec/types/
---
# Types & Variables

<p style="font-size: 1.25rem; color: #475569; margin-bottom: 2rem;">
  MIND is statically typed with powerful type inference.
</p>

### Primitive Types
* **i32, f32, f64**: Numeric primitives.
* **bool**: True or false.
* **str**: UTF-8 string slices.

### The Tensor Type
The core primitive for AI workloads:

<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem;">
let t: Tensor<f32, [3, 224, 224]> = load_image("cat.jpg");
</pre>
