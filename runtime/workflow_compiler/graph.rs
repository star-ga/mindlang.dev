//! Deterministic workflow graph stubs

#[derive(Debug, Default)]
pub struct WorkflowGraph {
    pub nodes: Vec<WorkflowNode>,
    pub edges: Vec<WorkflowEdge>,
}

#[derive(Debug, Default)]
pub struct WorkflowNode {
    pub id: String,
    pub kind: NodeKind,
}

#[derive(Debug, Default)]
pub struct WorkflowEdge {
    pub from: String,
    pub to: String,
}

#[derive(Debug)]
pub enum NodeKind {
    AgentStub,
    ToolCall,
    PatchNode,
}

impl Default for NodeKind {
    fn default() -> Self {
        Self::AgentStub
    }
}
