import { RejectedClearance } from "./types";

export const mockRejectedClearances: RejectedClearance[] = [
  {
    id: "RC-2026-001",
    clearanceNumber: "CLR-2026-4512",
    student: {
      id: "UGR/11223/13",
      name: "Solomon Tadesse",
      photoUrl: "https://i.pravatar.cc/150?u=a042581f4e290260241",
      universityEmail: "solomon.tadesse@mwu.edu.et",
      college: "College of Computing",
      department: "Software Engineering",
      program: "Regular Degree",
      admissionYear: "2013 EC",
    },
    type: "Graduation",
    submissionDate: "2026-06-10T08:30:00Z",
    rejectionDate: "2026-06-12T14:20:00Z",
    rejectedBy: "Ato Bekele Alemu",
    rejectedDepartment: "Library",
    rejectionCategory: "Unreturned Book",
    rejectionReason: "Student has an unreturned book: 'Introduction to Algorithms' (Barcode: 981234).",
    requiredAction: "Return the specified book to the main library and pay any late fees.",
    deadline: "2026-06-25T17:00:00Z",
    studentNotificationStatus: "Read",
    status: "Appeal Submitted",
    priority: "High",
    evidence: [
      {
        id: "EVD-101",
        name: "Library_System_Screenshot.jpg",
        type: "image/jpeg",
        size: "450 KB",
        uploadedBy: "Ato Bekele Alemu",
        uploadedDate: "2026-06-12T14:15:00Z",
        url: "#",
      }
    ],
    departmentDecisions: [
      {
        id: "DD-001",
        departmentName: "Library",
        officerName: "Ato Bekele Alemu",
        decision: "Rejected",
        decisionDate: "2026-06-12T14:20:00Z",
        processingTimeDays: 2,
        remarks: "Book missing from inventory, registered under student.",
      },
      {
        id: "DD-002",
        departmentName: "Dormitory",
        officerName: "Martha Bekele",
        decision: "Approved",
        decisionDate: "2026-06-11T10:00:00Z",
        processingTimeDays: 1,
      }
    ],
    appeal: {
      appealId: "APP-001",
      appealDate: "2026-06-14T09:00:00Z",
      appealReason: "Book already returned",
      studentExplanation: "I returned this book on June 8th during the final exam week. The library staff member might have forgotten to scan it back into the system.",
      status: "Submitted",
      supportingDocuments: [
        {
          id: "EVD-STU-1",
          name: "Return_Receipt_Photo.jpg",
          type: "image/jpeg",
          size: "1.2 MB",
          uploadedBy: "Solomon Tadesse",
          uploadedDate: "2026-06-14T09:00:00Z",
          url: "#",
        }
      ]
    },
    timeline: [
      {
        id: "TL-01",
        timestamp: "2026-06-10T08:30:00Z",
        action: "Clearance Submitted",
        user: "Solomon Tadesse",
        role: "Student",
        department: "N/A"
      },
      {
        id: "TL-02",
        timestamp: "2026-06-11T10:00:00Z",
        action: "Dormitory Approved",
        user: "Martha Bekele",
        role: "Officer",
        department: "Dormitory"
      },
      {
        id: "TL-03",
        timestamp: "2026-06-12T14:20:00Z",
        action: "Library Rejected",
        user: "Ato Bekele Alemu",
        role: "Officer",
        department: "Library",
        remarks: "Unreturned book."
      },
      {
        id: "TL-04",
        timestamp: "2026-06-14T09:00:00Z",
        action: "Appeal Submitted",
        user: "Solomon Tadesse",
        role: "Student",
        department: "N/A"
      }
    ],
    lastUpdated: "2026-06-14T09:00:00Z"
  },
  {
    id: "RC-2026-002",
    clearanceNumber: "CLR-2026-7890",
    student: {
      id: "UGR/55443/12",
      name: "Tigist Worku",
      photoUrl: "https://i.pravatar.cc/150?u=a042581f4e290260242",
      universityEmail: "tigist.worku@mwu.edu.et",
      college: "College of Business and Economics",
      department: "Accounting",
      program: "Extension Degree",
      admissionYear: "2012 EC",
    },
    type: "Withdrawal",
    submissionDate: "2026-07-01T10:00:00Z",
    rejectionDate: "2026-07-03T11:30:00Z",
    rejectedBy: "Wro. Almaz Tsegaye",
    rejectedDepartment: "Student Finance",
    rejectionCategory: "Financial Obligation",
    rejectionReason: "Outstanding tuition fee for the current semester (1,500 ETB).",
    requiredAction: "Clear the outstanding balance at the finance office and attach the receipt.",
    deadline: "2026-07-10T17:00:00Z",
    studentNotificationStatus: "Delivered",
    status: "Awaiting Student Action",
    priority: "Normal",
    evidence: [],
    departmentDecisions: [
      {
        id: "DD-003",
        departmentName: "Student Finance",
        officerName: "Wro. Almaz Tsegaye",
        decision: "Rejected",
        decisionDate: "2026-07-03T11:30:00Z",
        processingTimeDays: 2,
      }
    ],
    timeline: [
      {
        id: "TL-05",
        timestamp: "2026-07-01T10:00:00Z",
        action: "Clearance Submitted",
        user: "Tigist Worku",
        role: "Student",
        department: "N/A"
      },
      {
        id: "TL-06",
        timestamp: "2026-07-03T11:30:00Z",
        action: "Finance Rejected",
        user: "Wro. Almaz Tsegaye",
        role: "Officer",
        department: "Student Finance",
        remarks: "Unpaid fee."
      }
    ],
    lastUpdated: "2026-07-03T11:30:00Z"
  },
  {
    id: "RC-2026-003",
    clearanceNumber: "CLR-2026-9901",
    student: {
      id: "UGR/88776/11",
      name: "Dawit Tesfaye",
      photoUrl: "https://i.pravatar.cc/150?u=a042581f4e290260243",
      universityEmail: "dawit.tesfaye@mwu.edu.et",
      college: "College of Engineering",
      department: "Civil Engineering",
      program: "Regular Degree",
      admissionYear: "2011 EC",
    },
    type: "Graduation",
    submissionDate: "2026-05-15T09:00:00Z",
    rejectionDate: "2026-05-20T10:00:00Z",
    rejectedBy: "Dr. Samuel Tadesse",
    rejectedDepartment: "Registrar",
    rejectionCategory: "Policy Violation",
    rejectionReason: "Student was involved in a disciplinary issue that has not been formally resolved by the disciplinary committee.",
    requiredAction: "Contact the Dean of Students office for final resolution.",
    studentNotificationStatus: "Read",
    status: "Final Rejected",
    priority: "Critical",
    evidence: [],
    departmentDecisions: [],
    timeline: [
      {
        id: "TL-07",
        timestamp: "2026-05-15T09:00:00Z",
        action: "Clearance Submitted",
        user: "Dawit Tesfaye",
        role: "Student",
        department: "N/A"
      },
      {
        id: "TL-08",
        timestamp: "2026-05-20T10:00:00Z",
        action: "Final Rejection Applied",
        user: "Dr. Samuel Tadesse",
        role: "Registrar",
        department: "Registrar",
        remarks: "Disciplinary hold."
      }
    ],
    lastUpdated: "2026-05-20T10:00:00Z"
  }
];
