export type AccountStatus = "Active" | "Pending Invitation" | "Inactive" | "Suspended" | "Locked";
export type SystemRole = "Department Staff" | "Department Head" | "Registrar Staff" | "Registrar" | "Super Admin";

export interface StaffRecord {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  systemRole: SystemRole;
  accountStatus: AccountStatus;
  lastLogin: string | null;
  lastActivity: string | null;
  accountCreatedDate: string;
  profilePhoto?: string;
  assignedClearanceRequests: number;
  permissions: {
    inherited: string[];
    direct: string[];
  };
  auditLogs: AuditLog[];
}

export type DepartmentStatus = "Active" | "Inactive" | "Temporarily Closed" | "Under Maintenance" | "Archived";
export type DepartmentType = "Academic" | "Administrative" | "Facility" | "Library" | "Finance";

export interface DepartmentRecord {
  id: string;
  name: string;
  code: string;
  type: DepartmentType;
  headName: string;
  headId: string;
  assignedStaffCount: number;
  activeRequests: number;
  pendingRequests: number;
  completedRequests: number;
  averageProcessingTimeDays: number;
  status: DepartmentStatus;
  createdDate: string;
  clearanceResponsibilities: {
    graduation: boolean;
    withdrawal: boolean;
    transfer: boolean;
    academicDismissal: boolean;
    staffClearance: boolean;
  };
}

export interface AccessRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  department: string;
  requestedPermission: string;
  reason: string;
  submittedDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Expired";
  reviewer?: string;
}

export interface AuditLog {
  id: string;
  date: string;
  action: string;
  department: string;
  performedBy: string;
  remarks?: string;
  ipAddress?: string;
}

export interface RolePermissionMatrix {
  category: string;
  permissions: {
    name: string;
    departmentStaff: boolean;
    departmentHead: boolean;
    registrarStaff: boolean;
    registrar: boolean;
    superAdmin: boolean;
  }[];
}
