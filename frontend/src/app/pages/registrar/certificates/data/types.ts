export type CertificateStatus = 
  | "Pending Generation"
  | "Generated"
  | "Active"
  | "Downloaded"
  | "Verified"
  | "Regenerated"
  | "Correction Requested"
  | "Revoked"
  | "Archived";

export type VerificationStatus = 
  | "Never Verified"
  | "Verified"
  | "Verification Failed"
  | "Expired"
  | "Revoked";

export type ClearanceType = 
  | "Graduation"
  | "Withdrawal"
  | "Transfer"
  | "Academic Dismissal"
  | "Staff Clearance";

export interface CertificateVersion {
  id: string;
  versionNumber: number;
  createdDate: string;
  createdBy: string;
  reason: string;
  status: "Active" | "Archived" | "Revoked";
  documentHash: string;
}

export interface VerificationLog {
  id: string;
  date: string;
  result: "Valid" | "Invalid" | "Revoked";
  method: "QR Code" | "Verification Link" | "Public Verification";
  location: string;
  ip: string;
  userAgent: string;
}

export interface DownloadLog {
  id: string;
  date: string;
  downloadedBy: string;
  method: "Direct" | "Email Link";
  device: string;
  location: string;
  status: "Success" | "Failed";
}

export interface CorrectionRequest {
  id: string;
  originalValue: string;
  correctedValue: string;
  reason: string;
  requestedBy: string;
  requestedDate: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy?: string;
  approvalDate?: string;
}

export interface CertificateRecord {
  id: string;
  studentPhoto?: string;
  studentName: string;
  studentId: string;
  universityEmail: string;
  college: string;
  department: string;
  program: string;
  certificateNumber: string | null; // Null if pending generation
  clearanceNumber: string;
  clearanceType: ClearanceType;
  issueDate: string | null;
  certificateVersion: number;
  verificationStatus: VerificationStatus;
  certificateStatus: CertificateStatus;
  lastVerified: string | null;
  verificationToken: string | null;
  issuedBy: string | null;
  
  versions: CertificateVersion[];
  verificationHistory: VerificationLog[];
  downloadHistory: DownloadLog[];
  correctionRequests: CorrectionRequest[];
}
