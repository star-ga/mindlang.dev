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

The public website for **MIND**, the Machine Intelligence Native Design language. This site hosts the landing experience, documentation, community links, and resources for the MIND ecosystem.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server with live reload:

   ```bash
   npm start
   ```

3. Build a production bundle:

   ```bash
   npm run build
   ```

The Eleventy configuration lives in [`.eleventy.js`](./.eleventy.js) and outputs to `dist/`.

## License headers

This repo includes a helper to keep Apache 2.0 headers consistent across templates, JS, and styles:

```bash
npm run fmt:headers
```

The script is idempotent and will:

- Add headers to first-party .njk, .html, .md, .css, and .js files.
- Migrate old MIT or project-specific headers to the standard Apache 2.0 header.

## License & Ecosystem

- Code, configuration, and original content in this repository are licensed under Apache 2.0. See [LICENSE](./LICENSE).
- Documentation and language specification content sourced from [cputer/mind-spec](https://github.com/cputer/mind-spec) are also Apache 2.0 licensed.
- The core language implementation lives in [cputer/mind](https://github.com/cputer/mind) (Apache 2.0).
- The production runtime for commercial deployments is maintained in [cputer/mind-runtime](https://github.com/cputer/mind-runtime) and is proprietary/closed-source.
- Trademark and brand usage is governed by [TRADEMARKS.md](./TRADEMARKS.md) and [LICENSE-COMMERCIAL](./LICENSE-COMMERCIAL).

## Community

- Join the discussion and follow development at [cputer/mind](https://github.com/cputer/mind).
- For commercial inquiries or trademark questions, reach out at **legal@star.ga**.
