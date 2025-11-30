# Orchestrator Integration: AAE + NCE

## Overview
AAE compiles natural-language intents into workflow graphs, while NCE supplies deterministic context windows from external sources. The orchestrator consumes both outputs to assemble replayable agent flows.

## Data Flow
1. **AAE**: `WorkflowCompiler::compile_nl` converts input NL into a `WorkflowGraph` with agent stubs and tool-call nodes.
2. **NCE**: `ContextIngest::ingest_url` (and related adapters) normalize, chunk, and deduplicate context before injection.
3. **Merge**: Orchestrator binds graph nodes to context slices, enforcing deterministic ordering and schema validation.

## Integration Hooks
- **Schema Validation**: Workflow graph schemas validated before orchestration; failures block execution.
- **Context Safety**: Domain allowlist and chunk sanity checks enforced prior to merge.
- **Replay Guarantees**: Graph traversal order and context chunk hashing must remain stable across replays.
