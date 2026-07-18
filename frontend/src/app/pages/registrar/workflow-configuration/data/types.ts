export type WorkflowStatus = "Draft" | "Under Review" | "Published" | "Scheduled" | "Archived";
export type ApplicantType = "Student" | "Staff" | "Both";
export type NodeType = "Start" | "Student Validation" | "Department Review" | "Department Approval" | "Department Rejection" | "Document Verification" | "Physical ID Verification" | "Information Request" | "Conditional Branch" | "Parallel Review" | "Escalation" | "Registrar Review" | "Final Approval" | "Certificate Generation" | "End";

export interface ClearanceType {
  id: string;
  name: string;
  code: string;
  description: string;
  applicantType: ApplicantType;
  requiredDepartments: string[]; // Dept IDs
  activeVersionId: string | null;
  activeStatus: "Active" | "Inactive";
  displayOrder: number;
  lastUpdated: string;
  updatedBy: string;
}

export interface WorkflowVersion {
  id: string;
  clearanceTypeId: string;
  version: string;
  status: WorkflowStatus;
  createdBy: string;
  createdDate: string;
  publishedDate: string | null;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  dependencies: WorkflowDependency[];
  activeClearancesUsingVersion: number;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  departmentId?: string;
  isOptional: boolean;
  canReject: boolean;
  canRequestInfo: boolean;
  requiresDocumentVerification: boolean;
  processingDeadlineDays?: number;
  coordinates?: { x: number, y: number }; // For visual designer
}

export interface WorkflowEdge {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
  condition?: string;
}

export interface WorkflowDependency {
  id: string;
  targetNodeId: string;
  requiredNodeIds: string[];
  condition: "ALL" | "ANY";
}

export interface DocumentRequirement {
  id: string;
  clearanceTypeId: string;
  stepNodeId: string; // The workflow node where it is required
  documentName: string;
  documentType: string;
  isRequired: boolean;
  uploadedBy: "Student" | "Staff" | "Department" | "Registrar";
  acceptedFileTypes: string[];
  maxSizeBytes: number;
  verificationRequired: boolean;
}

export interface EscalationRule {
  id: string;
  workflowNodeId: string;
  triggerDaysOverdue: number;
  action: "Notify Department Head" | "Notify Registrar" | "Notify Super Admin" | "Increase Priority";
  recurring: boolean;
}

export interface ApprovalRule {
  id: string;
  clearanceTypeId: string;
  minimumApprovals: number; // e.g. 5, or "All" handled by checking all required departments
  allMustApprove: boolean;
  sequential: boolean; // if false, parallel
  registrarFinalApprovalRequired: boolean;
  physicalIdRequired: boolean;
}

export interface ConfigurationAuditLog {
  id: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  entityType: string;
  entityId: string;
  previousValue?: string;
  newValue?: string;
  timestamp: string;
  reason: string;
}
