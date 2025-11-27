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

# mindlang.dev

The marketing and documentation website for **MIND**, the Machine Intelligence Native Design language. The site is built with **Eleventy** and **SpruceCSS**, and mirrors the language specification from the [`mind-spec`](https://github.com/cputer/mind-spec) repository.

## Repositories

- [`cputer/mind`](https://github.com/cputer/mind): MIND compiler, CLI, and runtime backends (Apache 2.0, open-core).
- [`cputer/mind-spec`](https://github.com/cputer/mind-spec): Authoritative language specification, design documents, and RFCs (Apache 2.0).
- `cputer/mind-runtime`: Proprietary runtime extensions and services for commercial deployments.

## Local development

Install dependencies and build the site locally:

```bash
npm install
npm run build
npm run serve
```

- The Eleventy configuration lives in [`.eleventy.js`](./.eleventy.js) and outputs to `dist/`.
- The `src/docs/` directory is a git submodule mirror of `mind-spec`; do not modify its contents directly.

## License & trademarks

- Code, configuration, and original content in this repository are licensed under **Apache 2.0**. See [LICENSE](./LICENSE).
- The MIND language and compiler (Community Edition) are Apache 2.0; production runtime components are proprietary and governed by [LICENSE-COMMERCIAL](./LICENSE-COMMERCIAL).
- “MIND” and “MIND Language” are trademarks of STARGA Inc. See [TRADEMARKS.md](./TRADEMARKS.md) for permitted descriptive use.
- Commercial licensing and trademark inquiries: [legal@star.ga](mailto:legal@star.ga).
