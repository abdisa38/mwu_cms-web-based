export type ClearanceType = 'Graduation' | 'Withdrawal' | 'Transfer' | 'Academic Dismissal' | 'Staff Clearance';
export type ClearanceStatus = 'Pending' | 'In Progress' | 'Partially Approved' | 'Blocked' | 'Needs Student Action' | 'Needs Department Action' | 'Ready for Registrar Review' | 'Overdue';
export type Priority = 'Normal' | 'High' | 'Critical';
export type DepartmentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs Information' | 'Not Started' | 'Skipped';

export interface DepartmentApproval {
  id: string;
  departmentName: string;
  responsibleOfficer: string;
  status: DepartmentStatus;
  submittedDate?: string;
  decisionDate?: string;
  remarks?: string;
  processingDays?: number;
}

export interface ClearanceDocument {
  id: string;
  title: string;
  type: 'Application' | 'Supporting' | 'Department' | 'Appeal' | 'Registrar';
  uploadedBy: string;
  uploadDate: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  url: string;
}

export interface TimelineEvent {
  id: string;
  user: string;
  role: string;
  department?: string;
  date: string;
  time: string;
  action: string;
  remarks?: string;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  role: string;
  date: string;
  time: string;
  ip: string;
  action: string;
}

export interface ClearanceRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentPhoto: string;
  email: string;
  college: string;
  department: string;
  program: string;
  clearanceNumber: string;
  type: ClearanceType;
  submissionDate: string;
  currentStage: string;
  overallProgress: number; // 0 - 100
  pendingDepartments: string[];
  blockedBy?: {
    department: string;
    reason: string;
    requiredAction: string;
    dateBlocked: string;
    responsiblePerson: string;
  };
  priority: Priority;
  dueDate: string;
  lastActivity: string;
  status: ClearanceStatus;
  departments: DepartmentApproval[];
  documents: ClearanceDocument[];
  timeline: TimelineEvent[];
  auditLogs: AuditLogEntry[];
}
