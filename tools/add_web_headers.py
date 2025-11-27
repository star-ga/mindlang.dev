#!/usr/bin/env python3
"""
Add Apache 2.0 headers to first-party web source files.
"""
from __future__ import annotations

import os
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
APACHE_MARKER = "Licensed under the Apache License, Version 2.0"

HTML_HEADER = """<!--
Copyright 2025 STARGA Inc.

Licensed under the Apache License, Version 2.0 (the \"License\");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an \"AS IS\" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
"""

JS_HEADER = """/*
 * Copyright 2025 STARGA Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the \"License\");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an \"AS IS\" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"""

EXTENSION_STYLE = {
    ".njk": "html",
    ".html": "html",
    ".md": "html",
    ".css": "html",
    ".js": "js",
    ".mjs": "js",
    ".cjs": "js",
}

SKIP_DIRS = {"node_modules", "dist", ".git", ".github"}
SKIP_FILES = {"LICENSE", "LICENSE-COMMERCIAL", "TRADEMARKS.md"}

OLD_HEADER_PATTERNS = [
    "permission is hereby granted, free of charge",
    "mit license",
    "mind language specification",
    "community edition",
    "cone development",
]


def should_skip(path: Path) -> bool:
    if path.name in SKIP_FILES:
        return True
    for part in path.parts:
        if part in SKIP_DIRS:
            return True
    return False


def strip_old_header(content: str) -> str:
    lines = content.splitlines()
    lower_lines = [line.lower() for line in lines]

    for idx, line in enumerate(lower_lines[:40]):
        for pattern in OLD_HEADER_PATTERNS:
            if pattern in line:
                header_end = len(lines)
                for end_idx in range(idx, len(lines)):
                    if lines[end_idx].strip() == "" and end_idx > idx:
                        header_end = end_idx + 1
                        break
                remaining = lines[header_end:]
                while remaining and remaining[0].strip() == "":
                    remaining.pop(0)
                return "\n".join(remaining)

    return content


def add_header(path: Path) -> bool:
    if should_skip(path):
        return False

    ext = path.suffix.lower()
    if ext not in EXTENSION_STYLE:
        return False

    content = path.read_text(encoding="utf-8")
    if APACHE_MARKER in content:
        return False

    stripped = strip_old_header(content)
    header = HTML_HEADER if EXTENSION_STYLE[ext] == "html" else JS_HEADER
    new_content = f"{header}\n{stripped}"
    path.write_text(new_content.rstrip() + "\n", encoding="utf-8")
    return True


def main() -> None:
    changed_files: list[Path] = []
    for root, dirs, files in os.walk(REPO_ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for filename in files:
            path = Path(root) / filename
            if add_header(path):
                changed_files.append(path.relative_to(REPO_ROOT))

    if changed_files:
        print("Updated headers for:")
        for path in sorted(changed_files):
            print(f" - {path}")
    else:
        print("No header updates needed.")


if __name__ == "__main__":
    main()
