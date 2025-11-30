# Governance Profile: GP-A-Deterministic-Workflows

## Scope
Applies to AutoAgent Engine (AAE) and URL-Context Engine (NCE) components introduced in R7-PR4.

## Requirements
- Deterministic replay for workflow compilation and context ingestion.
- Domain allowlist enforcement for external context sources.
- Rate limits applied to all network-bound ingestion.
- Schema validation on workflow graphs prior to orchestration.
- Reproducible context memory layouts with stable chunk hashing.

## Oversight
- Changes to schema validators or allowlist policies require review by governance maintainers.
- SIE checkpoints must be kept current with compiler and ingestion changes.
