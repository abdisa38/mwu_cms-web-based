export interface DepartmentApproval {
  id: string;
  departmentName: string;
  status: 'Approved' | 'Rejected' | 'Needs Information' | 'Pending' | 'Not Started';
  responsibleOfficer: string;
  decisionDate: string | null;
  remarks: string | null;
}

export interface ClearanceDocument {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  status: 'Verified' | 'Not Verified' | 'Needs Review';
  fileUrl: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  action: string;
  user: string;
  role: string;
  department?: string;
  remarks?: string;
}

export interface AuditLogEntry {
  id: string;
  date: string;
  time: string;
  user: string;
  role: string;
  action: string;
  ip: string;
}

export interface ValidationCondition {
  id: string;
  label: string;
  status: 'Passed' | 'Failed' | 'Warning' | 'Not Applicable';
  details?: string;
}

export interface Appeal {
  id: string;
  appealNumber: string;
  status: 'Open' | 'Resolved' | 'Closed';
  date: string;
  department: string;
  reason: string;
}

export interface FinalApprovalRequest {
  id: string;
  studentName: string;
  studentId: string;
  studentPhoto: string;
  email: string;
  college: string;
  department: string;
  program: string;
  clearanceNumber: string;
  type: 'Graduation' | 'Withdrawal' | 'Transfer' | 'Academic Dismissal' | 'Staff Clearance';
  submissionDate: string;
  readyDate: string | null;
  
  status: 'Ready for Review' | 'Under Review' | 'Blocked' | 'Approved' | 'Returned';
  priority: 'Normal' | 'High' | 'Critical';
  overallProgress: number;

  physicalIdStatus: 'Received' | 'Not Received' | 'Verified' | 'Rejected' | 'Not Required';
  documentStatus: 'Complete' | 'Incomplete' | 'Needs Review';
  allDepartmentsStatus: 'Completed' | 'Pending' | 'Rejected';

  departments: DepartmentApproval[];
  documents: ClearanceDocument[];
  timeline: TimelineEvent[];
  auditLogs: AuditLogEntry[];
  
  validations: ValidationCondition[];
  activeAppeals: Appeal[];
}
