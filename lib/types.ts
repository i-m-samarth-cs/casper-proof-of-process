export interface WorkflowNode {
  id: string
  type: "start" | "approval" | "review" | "audit" | "manual" | "end"
  data: {
    label: string
    description?: string
    roles?: string[]
    sla?: number
    requiresEvidence?: boolean
  }
  position: { x: number; y: number }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  data?: {
    condition?: string
  }
}

export interface WorkflowDefinition {
  id: string
  name: string
  version: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  contractAddress?: string
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowInstance {
  id: string
  workflowId: string
  workflowName: string
  workflowVersion: string
  status: "in-progress" | "completed" | "violated"
  externalId?: string
  assignee?: string
  notes?: string
  steps: WorkflowStep[]
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowStep {
  id: string
  stepName: string
  actor: string
  timestamp: Date
  status: "completed" | "skipped" | "failed"
  evidenceHash?: string
  notes?: string
}
