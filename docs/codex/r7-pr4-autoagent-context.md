# R7-PR4: AutoAgent Engine (AAE) + URL-Context Engine (NCE)

## 1. Motivation
AutoAgent workflows have shown strong traction for zero-code agent orchestration, while DeepMind-style URL-context ingestion demonstrates deterministic context building without bespoke tooling. To keep Naestro aligned with these capabilities, we introduce AAE and NCE as deterministic extensions that preserve reproducibility, governance alignment, and SIE guardrails.

## 2. Scope
- **AAE — AutoAgent Workflow Compiler**: Natural-language → workflow-graph compiler with role inference, tool-call graph assembly, and reflection-based patching.
- **NCE — URL-Context Engine**: Unified ingestion for URLs, PDFs, and GitHub repositories with semantic chunking, deduplication, safety-layer filtering, and deterministic context injection.
- **Governance + SIE**: New checkpoints and replay requirements to keep orchestration deterministic.
- **Roadmap + Master Plan**: Align strategic docs to the R7-PR4 feature set.

## 3. Deliverables
- Runtime scaffolding for `runtime/workflow_compiler/` and `runtime/context_ingest/`.
- Architecture diagrams for AAE + NCE flows.
- Orchestrator integration notes and SIE updates.
- Governance profile updates.
- Roadmap and Master Plan references.

## 4. Architecture Highlights
- **AAE Compiler Flow**: NL prompt → deterministic compiler → workflow graph → orchestrator replay.
- **NCE Pipeline**: URL/PDF/GitHub → extractor → semantic chunker → deduplicator → deterministic context merge → orchestrator.
- **Determinism**: All stages must replay to identical outputs given identical inputs.

## 5. Governance + SIE Alignment
- **Governance Profile**: GP-A-Deterministic-Workflows governs both AAE and NCE.
- **SIE Updates**: Add workflow-schema validator (AAE) and domain allowlist + chunk sanity checks (NCE).
- **Rate Limits**: Ingestion must respect rate limiting and domain safety policies.

## 6. Acceptance Criteria
### AAE
- NL → workflow graph yields identical graphs on repeat runs.
- Tool-stub generation is schema-valid.
- Graph replay order matches compile order.

### NCE
- Identical inputs produce byte-identical semantic chunks.
- Deduplication remains deterministic.
- Context injection is replay-safe and policy compliant.

## 7. Integration Notes
- Orchestrator integrations reference `runtime/workflow_compiler` for graph construction and `runtime/context_ingest` for deterministic context supply.
- SIE checkpoints must run pre-orchestration to validate schemas, allowlists, and replay safety.
- Documentation cross-links added in roadmap and master plan.
