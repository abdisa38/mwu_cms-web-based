export type ClearanceType = "Graduation" | "Withdrawal" | "Transfer" | "Academic Dismissal" | "Staff Clearance";
export type CertificateStatus = "Generated" | "Downloaded" | "Verified" | "Corrected" | "Revoked" | "Archived";
export type RecordStatus = "Active" | "Corrected" | "Revoked" | "Archived";

export interface StudentInfo {
  id: string;
  name: string;
  photoUrl: string;
  universityEmail: string;
  college: string;
  department: string;
  program: string;
  admissionYear: string;
}

export interface DepartmentDecision {
  id: string;
  departmentName: string;
  officerName: string;
  decision: "Approved" | "Rejected";
  decisionDate: string;
  processingTimeDays: number;
  remarks?: string;
  documentsAttached: number;
  auditStatus: "Clean" | "Flagged";
}

export interface ClearanceDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  url: string;
  verificationStatus: "Verified" | "Pending";
}

export interface VerificationLog {
  id: string;
  timestamp: string;
  location: string;
  device: string;
  ipAddress: string;
  status: "Valid" | "Expired" | "Revoked" | "Invalid";
}

export interface CertificateInfo {
  certificateId: string;
  certificateNumber: string;
  version: number;
  qrToken: string;
  generatedBy: string;
  generatedAt: string;
  totalVerificationCount: number;
  lastVerifiedDate: string | null;
  lastVerificationLocation: string | null;
  documentHash: string;
  status: CertificateStatus;
  verificationLogs: VerificationLog[];
  revokedAt?: string;
  revocationReason?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  role: string;
  department: string;
  remarks?: string;
}

export interface CorrectionRequest {
  id: string;
  requestedBy: string;
  requestedDate: string;
  reason: string;
  affectedField: string;
  originalValue: string;
  proposedNewValue: string;
  supportingEvidenceUrl: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy?: string;
  approvalDate?: string;
}

export interface CompletedClearance {
  id: string;
  clearanceNumber: string;
  student: StudentInfo;
  type: ClearanceType;
  submissionDate: string;
  completionDate: string;
  totalProcessingTimeDays: number;
  finalApprovalDate: string;
  finalApprovedBy: string;
  recordStatus: RecordStatus;
  certificate: CertificateInfo;
  departmentDecisions: DepartmentDecision[];
  documents: ClearanceDocument[];
  auditLogs: AuditLogEntry[];
  correctionRequests: CorrectionRequest[];
  timeline: AuditLogEntry[]; // Reusing AuditLogEntry structure for simplicity
}
