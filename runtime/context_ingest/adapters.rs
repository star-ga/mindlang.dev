//! Adapters for various ingestion sources (skeleton)

pub struct UrlAdapter;
pub struct PdfAdapter;
pub struct RepoAdapter;

impl UrlAdapter {
    pub fn fetch(_url: &str) -> String {
        // TODO: deterministic fetch + sanitize
        unimplemented!()
    }
}

impl PdfAdapter {
    pub fn extract(_path: &str) -> String {
        // TODO: PDF text extraction
        unimplemented!()
    }
}

impl RepoAdapter {
    pub fn ingest_repo(_url: &str) -> String {
        // TODO: GitHub repo ingestion
        unimplemented!()
    }
}
