# SIE Updates for R7-PR4

## New Checkpoints
1. **Workflow Schema Validator (AAE)**: Ensures compiled graphs conform to orchestrator expectations and support deterministic traversal.
2. **Domain Allowlist & Chunk Sanity (NCE)**: Verifies ingestion sources, chunk stability, and deduplication outputs before context injection.

## Operational Notes
- Both checkpoints must execute prior to orchestration binding.
- Failures should emit actionable diagnostics with replay-friendly logs.
- Checkpoints must operate deterministically to avoid divergence between runs.
