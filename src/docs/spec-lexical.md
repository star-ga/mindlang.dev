---
title: Lexical Structure
layout: layouts/docs.njk
permalink: /docs/spec/lexical/
---
# Lexical Structure

<p style="font-size: 1.25rem; color: #475569; margin-bottom: 2rem;">
  The grammar and syntax rules of the MIND language.
</p>

### Keywords
The following keywords are reserved:

<ul style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; font-family: monospace; font-size: 0.875rem; background-color: #f8fafc; padding: 1rem; border-radius: 0.375rem; list-style: none;">
  <li>fn</li><li>let</li><li>mut</li>
  <li>tensor</li><li>struct</li><li>impl</li>
  <li>match</li><li>if</li><li>loop</li>
</ul>

### Comments
MIND supports C-style comments:

<pre style="background-color: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem;">
// Single line comment
/* Multi-line 
   comment */
</pre>
