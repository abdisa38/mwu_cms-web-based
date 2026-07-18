import { StaffRecord, DepartmentRecord, AccessRequest, RolePermissionMatrix } from "./types";

export const mockStaff: StaffRecord[] = [
  {
    id: "STF-001",
    employeeId: "EMP-2018-0012",
    fullName: "Abebe Kebede",
    email: "abebe.kebede@mwu.edu.et",
    phone: "+251 911 234567",
    department: "Library",
    jobTitle: "Head Librarian",
    systemRole: "Department Head",
    accountStatus: "Active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    accountCreatedDate: "2020-01-15T08:00:00Z",
    assignedClearanceRequests: 45,
    permissions: {
      inherited: ["View Clearances", "Review Clearances", "Approve Department Clearance", "Reject Clearance"],
      direct: ["Export Data"],
    },
    auditLogs: [
      { id: "AL-1", date: new Date().toISOString(), action: "Approved clearance for Student STD-001", department: "Library", performedBy: "Abebe Kebede" }
    ]
  },
  {
    id: "STF-002",
    employeeId: "EMP-2021-0089",
    fullName: "Chaltu Merga",
    email: "chaltu.merga@mwu.edu.et",
    phone: "+251 922 345678",
    department: "Dormitory",
    jobTitle: "Dormitory Proctor",
    systemRole: "Department Staff",
    accountStatus: "Pending Invitation",
    lastLogin: null,
    lastActivity: null,
    accountCreatedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    assignedClearanceRequests: 0,
    permissions: {
      inherited: ["View Clearances", "Review Clearances"],
      direct: [],
    },
    auditLogs: [
      { id: "AL-2", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), action: "Account Invitation Sent", department: "System", performedBy: "Super Admin" }
    ]
  },
  {
    id: "STF-003",
    employeeId: "EMP-2015-0045",
    fullName: "Dawit Tadesse",
    email: "dawit.tadesse@mwu.edu.et",
    phone: "+251 933 456789",
    department: "Registrar",
    jobTitle: "Senior Registrar Officer",
    systemRole: "Registrar Staff",
    accountStatus: "Active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    accountCreatedDate: "2018-09-01T08:00:00Z",
    assignedClearanceRequests: 120,
    permissions: {
      inherited: ["View Students", "Edit Student Information", "Verify Student", "View Clearances", "Review Clearances"],
      direct: ["Upload Documents", "Generate Certificates"],
    },
    auditLogs: []
  },
  {
    id: "STF-004",
    employeeId: "EMP-2023-0150",
    fullName: "Eyerusalem Alemu",
    email: "eyerusalem.alemu@mwu.edu.et",
    phone: "+251 944 567890",
    department: "Cafeteria",
    jobTitle: "Cafeteria Manager",
    systemRole: "Department Head",
    accountStatus: "Suspended",
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    accountCreatedDate: "2023-02-10T08:00:00Z",
    assignedClearanceRequests: 0,
    permissions: {
      inherited: ["View Clearances", "Review Clearances", "Approve Department Clearance", "Reject Clearance"],
      direct: [],
    },
    auditLogs: [
      { id: "AL-3", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), action: "Account Suspended", department: "System", performedBy: "Super Admin", remarks: "Extended leave of absence" }
    ]
  },
  {
    id: "STF-005",
    employeeId: "EMP-2010-0005",
    fullName: "Fasil Bekele",
    email: "fasil.bekele@mwu.edu.et",
    phone: "+251 955 678901",
    department: "IT Infrastructure",
    jobTitle: "System Administrator",
    systemRole: "Super Admin",
    accountStatus: "Active",
    lastLogin: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    lastActivity: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    accountCreatedDate: "2010-05-01T08:00:00Z",
    assignedClearanceRequests: 0,
    permissions: {
      inherited: ["Manage System Settings", "Manage Staff", "Manage Departments", "View Audit Logs"],
      direct: [],
    },
    auditLogs: []
  }
];

export const mockDepartments: DepartmentRecord[] = [
  {
    id: "DEPT-001",
    name: "University Library",
    code: "LIB-01",
    type: "Library",
    headName: "Abebe Kebede",
    headId: "STF-001",
    assignedStaffCount: 12,
    activeRequests: 45,
    pendingRequests: 15,
    completedRequests: 1250,
    averageProcessingTimeDays: 1.2,
    status: "Active",
    createdDate: "2010-01-01T00:00:00Z",
    clearanceResponsibilities: { graduation: true, withdrawal: true, transfer: true, academicDismissal: true, staffClearance: true }
  },
  {
    id: "DEPT-002",
    name: "Student Dormitory Services",
    code: "DORM-01",
    type: "Facility",
    headName: "Tilahun Goshu",
    headId: "STF-006",
    assignedStaffCount: 8,
    activeRequests: 80,
    pendingRequests: 40,
    completedRequests: 950,
    averageProcessingTimeDays: 2.5,
    status: "Active",
    createdDate: "2010-01-01T00:00:00Z",
    clearanceResponsibilities: { graduation: true, withdrawal: true, transfer: true, academicDismissal: true, staffClearance: false }
  },
  {
    id: "DEPT-003",
    name: "Student Cafeteria",
    code: "CAFE-01",
    type: "Facility",
    headName: "Eyerusalem Alemu",
    headId: "STF-004",
    assignedStaffCount: 5,
    activeRequests: 20,
    pendingRequests: 5,
    completedRequests: 1100,
    averageProcessingTimeDays: 0.8,
    status: "Active",
    createdDate: "2010-01-01T00:00:00Z",
    clearanceResponsibilities: { graduation: true, withdrawal: true, transfer: true, academicDismissal: true, staffClearance: false }
  },
  {
    id: "DEPT-004",
    name: "Registrar Office",
    code: "REG-01",
    type: "Administrative",
    headName: "Dr. Selamawit Hailu",
    headId: "STF-008",
    assignedStaffCount: 25,
    activeRequests: 150,
    pendingRequests: 60,
    completedRequests: 5000,
    averageProcessingTimeDays: 3.5,
    status: "Active",
    createdDate: "2010-01-01T00:00:00Z",
    clearanceResponsibilities: { graduation: true, withdrawal: true, transfer: true, academicDismissal: true, staffClearance: true }
  },
  {
    id: "DEPT-005",
    name: "University Bookstore",
    code: "BOOK-01",
    type: "Facility",
    headName: "Unassigned",
    headId: "",
    assignedStaffCount: 3,
    activeRequests: 0,
    pendingRequests: 0,
    completedRequests: 400,
    averageProcessingTimeDays: 1.0,
    status: "Temporarily Closed",
    createdDate: "2012-06-01T00:00:00Z",
    clearanceResponsibilities: { graduation: true, withdrawal: true, transfer: true, academicDismissal: true, staffClearance: false }
  }
];

export const mockAccessRequests: AccessRequest[] = [
  {
    id: "REQ-001",
    requesterId: "STF-002",
    requesterName: "Chaltu Merga",
    department: "Dormitory",
    requestedPermission: "Approve Department Clearance",
    reason: "Assisting department head while they are on leave.",
    submittedDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "Pending"
  },
  {
    id: "REQ-002",
    requesterId: "STF-003",
    requesterName: "Dawit Tadesse",
    department: "Registrar",
    requestedPermission: "Generate Certificates",
    reason: "Required for new batch of graduating students.",
    submittedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "Approved",
    reviewer: "Super Admin"
  }
];

export const mockPermissionMatrix: RolePermissionMatrix[] = [
  {
    category: "Clearances",
    permissions: [
      { name: "View Clearances", departmentStaff: true, departmentHead: true, registrarStaff: true, registrar: true, superAdmin: true },
      { name: "Review Clearances", departmentStaff: true, departmentHead: true, registrarStaff: true, registrar: true, superAdmin: true },
      { name: "Approve Department Clearance", departmentStaff: false, departmentHead: true, registrarStaff: false, registrar: false, superAdmin: true },
      { name: "Reject Clearance", departmentStaff: false, departmentHead: true, registrarStaff: false, registrar: false, superAdmin: true },
      { name: "Request Information", departmentStaff: true, departmentHead: true, registrarStaff: true, registrar: true, superAdmin: true },
    ]
  },
  {
    category: "Students",
    permissions: [
      { name: "View Students", departmentStaff: false, departmentHead: true, registrarStaff: true, registrar: true, superAdmin: true },
      { name: "Edit Student Information", departmentStaff: false, departmentHead: false, registrarStaff: true, registrar: true, superAdmin: true },
      { name: "Verify Student", departmentStaff: false, departmentHead: false, registrarStaff: true, registrar: true, superAdmin: true },
    ]
  },
  {
    category: "System Administration",
    permissions: [
      { name: "Manage Staff", departmentStaff: false, departmentHead: false, registrarStaff: false, registrar: true, superAdmin: true },
      { name: "Manage Departments", departmentStaff: false, departmentHead: false, registrarStaff: false, registrar: true, superAdmin: true },
      { name: "View Audit Logs", departmentStaff: false, departmentHead: false, registrarStaff: false, registrar: true, superAdmin: true },
      { name: "Manage System Settings", departmentStaff: false, departmentHead: false, registrarStaff: false, registrar: false, superAdmin: true },
    ]
  }
];
