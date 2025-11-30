//! NCE — URL/PDF/GitHub ingestion layer (skeleton)

pub mod adapters;

pub struct ContextIngest;

pub struct IngestResult {
    pub source: String,
    pub chunks: Vec<String>,
}

impl ContextIngest {
    pub fn ingest_url(_url: &str) -> IngestResult {
        // TODO: HTML cleanup + semantic extraction
        // TODO: dedup + chunking
        // TODO: deterministic merge
        unimplemented!()
    }
}
