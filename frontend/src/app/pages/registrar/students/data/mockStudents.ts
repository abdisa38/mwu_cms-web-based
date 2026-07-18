import { StudentRecord } from "./types";

export const mockStudents: StudentRecord[] = [
  {
    id: "STD-001",
    profilePhoto: "https://i.pravatar.cc/150?u=abebe",
    fullName: "Abebe Kebede",
    studentId: "UGR/1020/12",
    email: "abebe.kebede@student.mwu.edu.et",
    phone: "+251 911 234 567",
    gender: "Male",
    dateOfBirth: "2000-05-15",
    address: "Bale Robe, Oromia, Ethiopia",
    emergencyContact: "Kebede Alemu (+251 922 345 678)",

    college: "Computing and Informatics",
    department: "Computer Science",
    program: "BSc in Computer Science",
    degree: "Bachelor of Science",
    yearLevel: 4,
    academicStatus: "Regular",
    admissionYear: 2019,
    expectedGraduation: 2023,
    advisor: "Dr. Sisay Tadesse",
    studentCategory: "Undergraduate",

    studentStatus: "Active",
    verificationStatus: "Verified",
    accountStatus: "Active",
    currentClearanceStatus: "Completed",

    registrationDate: "2019-09-10T08:00:00Z",
    lastLogin: "2026-07-18T08:30:00Z",
    lastActivity: "2026-07-18T09:15:00Z",

    idDocumentUrl: "https://example.com/id.jpg",
    idNumber: "ID-1020-12",
    verifiedBy: "Registrar Admin",
    verificationDate: "2019-10-01T10:00:00Z",

    clearanceHistory: [
      {
        id: "CLR-2026-001",
        clearanceNumber: "CLR-2026-001",
        type: "Graduation",
        submissionDate: "2026-06-15T09:00:00Z",
        completionDate: "2026-07-10T14:30:00Z",
        status: "Completed",
        progress: 100,
        certificateNumber: "MWU-EC-2026-000001",
        finalApprover: "Dr. Aster Tadesse",
      }
    ],
    departmentDecisions: [
      { id: "DD-1", departmentName: "Library", officer: "Solomon T.", decision: "Approved", date: "2026-06-16T10:00:00Z" },
      { id: "DD-2", departmentName: "Cafeteria", officer: "Genet M.", decision: "Approved", date: "2026-06-17T11:00:00Z" },
      { id: "DD-3", departmentName: "Department Head", officer: "Dr. Sisay T.", decision: "Approved", date: "2026-06-20T09:00:00Z" }
    ],
    documents: [
      { id: "DOC-1", name: "Student_ID_Card.pdf", type: "ID", uploadedBy: "Abebe Kebede", uploadDate: "2019-09-12T10:00:00Z", size: "1.2 MB", status: "Verified" },
      { id: "DOC-2", name: "Clearance_Form_Signed.pdf", type: "Clearance", uploadedBy: "Abebe Kebede", uploadDate: "2026-06-15T09:00:00Z", size: "2.4 MB", status: "Verified" }
    ],
    appeals: [],
    communications: [
      { id: "COM-1", type: "System Alert", subject: "Clearance Approved", date: "2026-07-10T14:30:00Z", sender: "System", status: "Delivered", readStatus: "Read" }
    ],
    auditLogs: [
      { id: "AL-1", date: "2026-06-15T09:00:00Z", action: "Clearance Started", user: "Abebe Kebede", role: "Student", department: "N/A" },
      { id: "AL-2", date: "2026-07-10T14:30:00Z", action: "Final Approval", user: "Dr. Aster Tadesse", role: "Registrar", department: "Registrar Office", remarks: "All requirements met." }
    ],
    certificates: []
  },
  {
    id: "STD-002",
    profilePhoto: "https://i.pravatar.cc/150?u=chaltu",
    fullName: "Chaltu Merga",
    studentId: "UGR/1543/12",
    email: "chaltu.m@student.mwu.edu.et",
    phone: "+251 922 111 222",
    gender: "Female",
    dateOfBirth: "2001-02-20",
    address: "Adama, Oromia, Ethiopia",
    emergencyContact: "Merga Tufa (+251 933 222 111)",

    college: "Business and Economics",
    department: "Accounting",
    program: "BA in Accounting",
    degree: "Bachelor of Arts",
    yearLevel: 3,
    academicStatus: "Regular",
    admissionYear: 2020,
    expectedGraduation: 2024,
    advisor: "Ato Bekele W.",
    studentCategory: "Undergraduate",

    studentStatus: "Active",
    verificationStatus: "Pending",
    accountStatus: "Active",
    currentClearanceStatus: "In Progress",

    registrationDate: "2020-10-05T08:00:00Z",
    lastLogin: "2026-07-17T14:00:00Z",
    lastActivity: "2026-07-17T15:30:00Z",

    idDocumentUrl: "https://example.com/id2.jpg",
    idNumber: "ID-1543-12",

    clearanceHistory: [
      {
        id: "CLR-2026-045",
        clearanceNumber: "CLR-2026-045",
        type: "Withdrawal",
        submissionDate: "2026-07-10T10:00:00Z",
        status: "In Progress",
        progress: 60,
        rejectedDepartment: "Library"
      }
    ],
    departmentDecisions: [
      { id: "DD-4", departmentName: "Library", officer: "Solomon T.", decision: "Rejected", date: "2026-07-12T10:00:00Z", remarks: "Unreturned book: Introduction to Accounting" },
      { id: "DD-5", departmentName: "Cafeteria", officer: "Genet M.", decision: "Approved", date: "2026-07-11T11:00:00Z" }
    ],
    documents: [
      { id: "DOC-3", name: "Student_ID_Card.jpg", type: "ID", uploadedBy: "Chaltu Merga", uploadDate: "2026-07-10T10:00:00Z", size: "800 KB", status: "Pending" }
    ],
    appeals: [
      { id: "APP-001", appealNumber: "APP-001", clearanceNumber: "CLR-2026-045", date: "2026-07-13T09:00:00Z", reason: "Book was returned yesterday, library system not updated.", status: "Under Review", reviewer: "Solomon T." }
    ],
    communications: [],
    auditLogs: [],
    certificates: []
  },
  {
    id: "STD-003",
    profilePhoto: undefined,
    fullName: "Dawit Alemu",
    studentId: "UGR/2001/13",
    email: "dawit.alemu@student.mwu.edu.et",
    phone: "+251 944 555 666",
    gender: "Male",
    dateOfBirth: "2002-11-30",
    address: "Hawassa, Sidama, Ethiopia",
    emergencyContact: "Alemu Bekele (+251 955 666 777)",

    college: "Engineering",
    department: "Civil Engineering",
    program: "BSc in Civil Engineering",
    degree: "Bachelor of Science",
    yearLevel: 2,
    academicStatus: "Suspended",
    admissionYear: 2021,
    expectedGraduation: 2026,
    advisor: "Dr. Yonas K.",
    studentCategory: "Undergraduate",

    studentStatus: "Suspended",
    verificationStatus: "Verified",
    accountStatus: "Suspended",
    currentClearanceStatus: "No Clearance",

    registrationDate: "2021-09-20T08:00:00Z",
    lastLogin: "2025-12-10T09:00:00Z",
    lastActivity: "2026-01-05T10:00:00Z",

    verifiedBy: "Registrar Admin",
    verificationDate: "2021-10-05T10:00:00Z",

    clearanceHistory: [],
    departmentDecisions: [],
    documents: [],
    appeals: [],
    communications: [],
    auditLogs: [
      { id: "AL-3", date: "2026-01-05T10:00:00Z", action: "Account Suspended", user: "Registrar Admin", role: "Registrar", department: "Registrar Office", remarks: "Disciplinary action." }
    ],
    certificates: []
  }
];
