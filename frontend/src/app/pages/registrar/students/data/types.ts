export type StudentStatus = "Active" | "Inactive" | "Suspended" | "Graduated" | "Withdrawn" | "Transferred" | "Dismissed";
export type VerificationStatus = "Pending" | "Verified" | "Rejected" | "Needs Review";
export type AccountStatus = "Active" | "Inactive" | "Suspended" | "Pending Verification";
export type ClearanceStatus = "No Clearance" | "Pending" | "In Progress" | "Completed" | "Rejected" | "Appeal Submitted";
export type ClearanceType = "Graduation" | "Withdrawal" | "Transfer" | "Academic Dismissal" | "Staff Clearance";

export interface ClearanceHistoryItem {
  id: string;
  clearanceNumber: string;
  type: ClearanceType;
  submissionDate: string;
  completionDate?: string;
  status: ClearanceStatus;
  progress: number;
  rejectedDepartment?: string;
  certificateNumber?: string;
  finalApprover?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: "Clearance" | "Supporting" | "Department" | "Appeal" | "Certificate" | "ID";
  uploadedBy: string;
  uploadDate: string;
  size: string;
  status: "Verified" | "Pending" | "Rejected";
}

export interface AppealItem {
  id: string;
  appealNumber: string;
  clearanceNumber: string;
  date: string;
  reason: string;
  status: "Submitted" | "Under Review" | "Information Requested" | "Approved" | "Rejected" | "Withdrawn" | "Expired";
  reviewer?: string;
  decisionDate?: string;
}

export interface CommunicationItem {
  id: string;
  type: "Email" | "System Alert" | "Message";
  subject: string;
  date: string;
  sender: string;
  status: "Sent" | "Failed" | "Delivered";
  readStatus: "Read" | "Unread";
}

export interface AuditLogItem {
  id: string;
  date: string;
  action: string;
  user: string;
  role: string;
  department: string;
  remarks?: string;
}

export interface DepartmentDecision {
  id: string;
  departmentName: string;
  officer: string;
  decision: "Approved" | "Rejected" | "Pending" | "Info Requested";
  date: string;
  remarks?: string;
}

export interface StudentRecord {
  id: string;
  profilePhoto?: string;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  address: string;
  emergencyContact: string;

  // Academic
  college: string;
  department: string;
  program: string;
  degree: string;
  yearLevel: number;
  academicStatus: string;
  admissionYear: number;
  expectedGraduation: number;
  advisor: string;
  studentCategory: string;

  // Statuses
  studentStatus: StudentStatus;
  verificationStatus: VerificationStatus;
  accountStatus: AccountStatus;
  currentClearanceStatus: ClearanceStatus;

  // Timestamps
  registrationDate: string;
  lastLogin: string;
  lastActivity: string;

  // Verification Details
  idDocumentUrl?: string;
  idNumber?: string;
  verifiedBy?: string;
  verificationDate?: string;

  // Relational Data
  clearanceHistory: ClearanceHistoryItem[];
  departmentDecisions: DepartmentDecision[]; // For the active clearance
  documents: DocumentItem[];
  appeals: AppealItem[];
  communications: CommunicationItem[];
  auditLogs: AuditLogItem[];
  certificates: any[]; // Kept generic to reuse existing cert structure if needed
}
