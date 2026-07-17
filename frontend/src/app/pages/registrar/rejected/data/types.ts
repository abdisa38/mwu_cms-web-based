export type ClearanceType = "Graduation" | "Withdrawal" | "Transfer" | "Academic Dismissal" | "Staff Clearance";
export type RejectionStatus = "Rejected" | "Awaiting Student Action" | "Appeal Submitted" | "Under Review" | "Information Requested" | "Reopened" | "Reconsideration Approved" | "Reconsideration Rejected" | "Final Rejected";
export type AppealStatus = "No Appeal" | "Submitted" | "Under Review" | "Information Requested" | "Approved" | "Rejected" | "Withdrawn" | "Expired";
export type PriorityLevel = "Normal" | "High" | "Critical";

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

export interface RejectionEvidence {
  id: string;
  name: string;
  type: string; // MIME type
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  url: string;
}

export interface WorkflowEvent {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  role: string;
  department: string;
  remarks?: string;
}

export interface DepartmentDecision {
  id: string;
  departmentName: string;
  officerName: string;
  decision: "Approved" | "Rejected" | "Pending" | "Returned";
  decisionDate: string;
  processingTimeDays: number;
  remarks?: string;
}

export interface Appeal {
  appealId: string;
  appealDate: string;
  appealReason: string;
  studentExplanation: string;
  supportingDocuments: RejectionEvidence[];
  status: AppealStatus;
  assignedReviewer?: string;
  reviewDeadline?: string;
  decision?: "Approved" | "Rejected" | "Information Requested";
  decisionReason?: string;
  decisionDate?: string;
}

export interface RejectedClearance {
  id: string;
  clearanceNumber: string;
  student: StudentInfo;
  type: ClearanceType;
  submissionDate: string;
  rejectionDate: string;
  rejectedBy: string;
  rejectedDepartment: string;
  rejectionCategory: string;
  rejectionReason: string;
  requiredAction: string;
  deadline?: string;
  studentNotificationStatus: "Delivered" | "Read" | "Pending";
  status: RejectionStatus;
  priority: PriorityLevel;
  evidence: RejectionEvidence[];
  departmentDecisions: DepartmentDecision[];
  appeal?: Appeal;
  timeline: WorkflowEvent[];
  lastUpdated: string;
}
