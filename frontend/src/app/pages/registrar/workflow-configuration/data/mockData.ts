import { 
  ClearanceType, 
  WorkflowVersion, 
  WorkflowNode, 
  WorkflowEdge, 
  WorkflowDependency,
  ConfigurationAuditLog 
} from "./types";

export const mockClearanceTypes: ClearanceType[] = [
  {
    id: "CT-GRAD",
    name: "Graduation Clearance",
    code: "GRAD",
    description: "Standard clearance required for all graduating students prior to certificate issuance.",
    applicantType: "Student",
    requiredDepartments: ["DEPT-LIB", "DEPT-DORM", "DEPT-CAFE", "DEPT-REG"],
    activeVersionId: "WV-GRAD-2.0",
    activeStatus: "Active",
    displayOrder: 1,
    lastUpdated: "2026-05-10T10:00:00Z",
    updatedBy: "Super Admin",
  },
  {
    id: "CT-WITH",
    name: "Withdrawal Clearance",
    code: "WITHDRAW",
    description: "Clearance required for students voluntarily withdrawing from the university.",
    applicantType: "Student",
    requiredDepartments: ["DEPT-LIB", "DEPT-DORM", "DEPT-CAFE", "DEPT-FIN", "DEPT-REG"],
    activeVersionId: "WV-WITH-1.1",
    activeStatus: "Active",
    displayOrder: 2,
    lastUpdated: "2026-02-15T14:30:00Z",
    updatedBy: "Registrar Head",
  },
  {
    id: "CT-STAFF",
    name: "Staff Clearance",
    code: "STAFF-SEP",
    description: "Required clearance workflow for separating staff members.",
    applicantType: "Staff",
    requiredDepartments: ["DEPT-LIB", "DEPT-FIN", "DEPT-HR"],
    activeVersionId: "WV-STAFF-1.0",
    activeStatus: "Inactive",
    displayOrder: 3,
    lastUpdated: "2025-11-20T09:15:00Z",
    updatedBy: "Super Admin",
  }
];

export const mockWorkflowNodesGraduation: WorkflowNode[] = [
  { id: "node-start", type: "Start", label: "Student Initiates Clearance", isOptional: false, canReject: false, canRequestInfo: false, requiresDocumentVerification: false, coordinates: { x: 50, y: 300 } },
  { id: "node-verify", type: "Student Validation", label: "System Verification", isOptional: false, canReject: true, canRequestInfo: false, requiresDocumentVerification: false, coordinates: { x: 250, y: 300 } },
  
  // Parallel blocks
  { id: "node-lib", type: "Department Review", label: "Library Review", departmentId: "DEPT-LIB", isOptional: false, canReject: true, canRequestInfo: true, requiresDocumentVerification: false, processingDeadlineDays: 2, coordinates: { x: 500, y: 150 } },
  { id: "node-dorm", type: "Department Review", label: "Dormitory Review", departmentId: "DEPT-DORM", isOptional: false, canReject: true, canRequestInfo: true, requiresDocumentVerification: false, processingDeadlineDays: 2, coordinates: { x: 500, y: 250 } },
  { id: "node-cafe", type: "Department Review", label: "Cafeteria Review", departmentId: "DEPT-CAFE", isOptional: false, canReject: true, canRequestInfo: true, requiresDocumentVerification: false, processingDeadlineDays: 1, coordinates: { x: 500, y: 350 } },
  { id: "node-book", type: "Department Review", label: "Bookstore Review", departmentId: "DEPT-BOOK", isOptional: true, canReject: true, canRequestInfo: false, requiresDocumentVerification: false, processingDeadlineDays: 1, coordinates: { x: 500, y: 450 } },

  // Sequential tail
  { id: "node-depthead", type: "Department Approval", label: "Department Head Approval", departmentId: "DEPT-HEAD", isOptional: false, canReject: true, canRequestInfo: true, requiresDocumentVerification: true, processingDeadlineDays: 3, coordinates: { x: 750, y: 300 } },
  { id: "node-reg-review", type: "Registrar Review", label: "Registrar Final Review", departmentId: "DEPT-REG", isOptional: false, canReject: true, canRequestInfo: true, requiresDocumentVerification: true, processingDeadlineDays: 3, coordinates: { x: 950, y: 300 } },
  { id: "node-cert", type: "Certificate Generation", label: "Generate Certificate", isOptional: false, canReject: false, canRequestInfo: false, requiresDocumentVerification: false, coordinates: { x: 1150, y: 300 } },
  { id: "node-end", type: "End", label: "Clearance Completed", isOptional: false, canReject: false, canRequestInfo: false, requiresDocumentVerification: false, coordinates: { x: 1350, y: 300 } },
];

export const mockWorkflowEdgesGraduation: WorkflowEdge[] = [
  { id: "e1", sourceId: "node-start", targetId: "node-verify" },
  { id: "e2a", sourceId: "node-verify", targetId: "node-lib", label: "Valid" },
  { id: "e2b", sourceId: "node-verify", targetId: "node-dorm" },
  { id: "e2c", sourceId: "node-verify", targetId: "node-cafe" },
  { id: "e2d", sourceId: "node-verify", targetId: "node-book" },

  { id: "e3a", sourceId: "node-lib", targetId: "node-depthead", condition: "Approved" },
  { id: "e3b", sourceId: "node-dorm", targetId: "node-depthead", condition: "Approved" },
  { id: "e3c", sourceId: "node-cafe", targetId: "node-depthead", condition: "Approved" },
  { id: "e3d", sourceId: "node-book", targetId: "node-depthead", condition: "Approved" },

  { id: "e4", sourceId: "node-depthead", targetId: "node-reg-review" },
  { id: "e5", sourceId: "node-reg-review", targetId: "node-cert" },
  { id: "e6", sourceId: "node-cert", targetId: "node-end" },
];

export const mockWorkflowVersions: WorkflowVersion[] = [
  {
    id: "WV-GRAD-2.0",
    clearanceTypeId: "CT-GRAD",
    version: "2.0",
    status: "Published",
    createdBy: "Super Admin",
    createdDate: "2026-05-01T10:00:00Z",
    publishedDate: "2026-05-10T10:00:00Z",
    nodes: mockWorkflowNodesGraduation,
    edges: mockWorkflowEdgesGraduation,
    dependencies: [
      { id: "dep-1", targetNodeId: "node-depthead", requiredNodeIds: ["node-lib", "node-dorm", "node-cafe"], condition: "ALL" }
    ],
    activeClearancesUsingVersion: 1245
  },
  {
    id: "WV-GRAD-1.0",
    clearanceTypeId: "CT-GRAD",
    version: "1.0",
    status: "Archived",
    createdBy: "Super Admin",
    createdDate: "2025-01-01T10:00:00Z",
    publishedDate: "2025-01-10T10:00:00Z",
    nodes: [], // Omitted for brevity
    edges: [],
    dependencies: [],
    activeClearancesUsingVersion: 0
  }
];

export const mockAuditLogs: ConfigurationAuditLog[] = [
  {
    id: "AUD-001",
    userId: "USR-1",
    userName: "Fasil Bekele",
    role: "Super Admin",
    action: "Published Workflow Version",
    entityType: "WorkflowVersion",
    entityId: "WV-GRAD-2.0",
    timestamp: "2026-05-10T10:00:00Z",
    reason: "Updated department approval deadlines and added parallel bookstore review."
  },
  {
    id: "AUD-002",
    userId: "USR-2",
    userName: "Dr. Selamawit Hailu",
    role: "Registrar Head",
    action: "Deactivated Clearance Type",
    entityType: "ClearanceType",
    entityId: "CT-STAFF",
    timestamp: "2026-06-15T09:30:00Z",
    reason: "HR migrating staff clearance to external system temporarily."
  }
];
