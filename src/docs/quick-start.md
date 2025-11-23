---
title: Quick Start
layout: layouts/docs.njk
---
# Quick Start

<p style="font-size: 1.25rem; color: #475569; margin-bottom: 2rem;">
  Write and run your first Tensor program in 5 minutes.
</p>

### 1. Create a Project
Initialize a new project using the CLI:

<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
mind new hello_tensor
cd hello_tensor
</pre>

### 2. Write Code
Open <code>main.mnd</code> and add the following:

<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.5rem;">
fn main() {
    let a = tensor([1.0, 2.0, 3.0]);
    let b = tensor([4.0, 5.0, 6.0]);
    
    // Native vector addition
    let c = a + b;
    
    print("Result: {}", c);
}
</pre>

### 3. Run It
<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem;">
mind run
# Output: Result: [5.0, 7.0, 9.0]
</pre>
