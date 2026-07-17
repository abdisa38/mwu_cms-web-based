import { CompletedClearance } from "./types";

export const mockCompletedClearances: CompletedClearance[] = [
  {
    id: "CC-2026-001",
    clearanceNumber: "CLR-2026-8921",
    student: {
      id: "UGR/12345/13",
      name: "Abebe Kebede",
      photoUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      universityEmail: "abebe.kebede@mwu.edu.et",
      college: "College of Computing",
      department: "Computer Science",
      program: "Regular Degree",
      admissionYear: "2013 EC",
    },
    type: "Graduation",
    submissionDate: "2026-06-15T08:30:00Z",
    completionDate: "2026-06-25T14:45:00Z",
    totalProcessingTimeDays: 10,
    finalApprovalDate: "2026-06-25T14:45:00Z",
    finalApprovedBy: "Dr. Samuel Tadesse (Registrar)",
    recordStatus: "Active",
    certificate: {
      certificateId: "CERT-9901-ABC",
      certificateNumber: "MWU-CERT-2026-001",
      version: 1,
      qrToken: "tok_9901abc_verify",
      generatedBy: "System Auto-Generator",
      generatedAt: "2026-06-25T14:46:00Z",
      totalVerificationCount: 3,
      lastVerifiedDate: "2026-07-10T09:15:00Z",
      lastVerificationLocation: "Addis Ababa, Ethiopia",
      documentHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      status: "Verified",
      verificationLogs: [
        {
          id: "VL-101",
          timestamp: "2026-07-10T09:15:00Z",
          location: "Addis Ababa, Ethiopia",
          device: "Mobile Safari 17.0",
          ipAddress: "196.189.12.4",
          status: "Valid"
        },
        {
          id: "VL-100",
          timestamp: "2026-07-05T14:20:00Z",
          location: "Bale Robe, Ethiopia",
          device: "Chrome Desktop 124.0",
          ipAddress: "196.189.15.2",
          status: "Valid"
        }
      ]
    },
    departmentDecisions: [
      {
        id: "DD-001",
        departmentName: "Library",
        officerName: "Hanna Tefera",
        decision: "Approved",
        decisionDate: "2026-06-16T10:00:00Z",
        processingTimeDays: 1,
        documentsAttached: 0,
        auditStatus: "Clean"
      },
      {
        id: "DD-002",
        departmentName: "Student Cafe",
        officerName: "Dawit Alemu",
        decision: "Approved",
        decisionDate: "2026-06-17T09:30:00Z",
        processingTimeDays: 2,
        documentsAttached: 0,
        auditStatus: "Clean"
      },
      {
        id: "DD-003",
        departmentName: "Dormitory",
        officerName: "Martha Bekele",
        decision: "Approved",
        decisionDate: "2026-06-18T14:00:00Z",
        processingTimeDays: 3,
        remarks: "Keys returned in good condition.",
        documentsAttached: 1,
        auditStatus: "Clean"
      },
      {
        id: "DD-004",
        departmentName: "Computer Science",
        officerName: "Dr. Yonas Mengistu",
        decision: "Approved",
        decisionDate: "2026-06-20T11:00:00Z",
        processingTimeDays: 5,
        documentsAttached: 0,
        auditStatus: "Clean"
      }
    ],
    documents: [
      {
        id: "DOC-101",
        name: "Student_ID_Return_Receipt.pdf",
        type: "application/pdf",
        size: "245 KB",
        uploadedBy: "Registrar Officer",
        uploadedDate: "2026-06-25T10:00:00Z",
        url: "#",
        verificationStatus: "Verified"
      },
      {
        id: "DOC-102",
        name: "Dormitory_Clearance_Form.pdf",
        type: "application/pdf",
        size: "1.2 MB",
        uploadedBy: "Martha Bekele",
        uploadedDate: "2026-06-18T14:00:00Z",
        url: "#",
        verificationStatus: "Verified"
      }
    ],
    auditLogs: [
      {
        id: "AL-500",
        timestamp: "2026-06-25T14:46:00Z",
        action: "Certificate Generated",
        user: "System",
        role: "System",
        department: "Registrar"
      },
      {
        id: "AL-499",
        timestamp: "2026-06-25T14:45:00Z",
        action: "Final Approval Granted",
        user: "Dr. Samuel Tadesse",
        role: "Registrar Admin",
        department: "Registrar",
        remarks: "All departmental requirements met. Physical ID verified."
      }
    ],
    correctionRequests: [],
    timeline: [
      {
        id: "TL-01",
        timestamp: "2026-06-15T08:30:00Z",
        action: "Clearance Submitted",
        user: "Abebe Kebede",
        role: "Student",
        department: "N/A"
      },
      {
        id: "TL-02",
        timestamp: "2026-06-20T11:00:00Z",
        action: "Department Approvals Completed",
        user: "System",
        role: "System",
        department: "System"
      },
      {
        id: "TL-03",
        timestamp: "2026-06-25T14:45:00Z",
        action: "Final Approval Completed",
        user: "Dr. Samuel Tadesse",
        role: "Registrar Admin",
        department: "Registrar"
      }
    ]
  },
  {
    id: "CC-2026-002",
    clearanceNumber: "CLR-2026-7844",
    student: {
      id: "UGR/54321/12",
      name: "Tigist Haile",
      photoUrl: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      universityEmail: "tigist.haile@mwu.edu.et",
      college: "College of Business and Economics",
      department: "Accounting",
      program: "Extension Degree",
      admissionYear: "2012 EC",
    },
    type: "Withdrawal",
    submissionDate: "2026-07-01T09:00:00Z",
    completionDate: "2026-07-05T16:20:00Z",
    totalProcessingTimeDays: 4,
    finalApprovalDate: "2026-07-05T16:20:00Z",
    finalApprovedBy: "Wro. Almaz Tsegaye (Senior Officer)",
    recordStatus: "Active",
    certificate: {
      certificateId: "CERT-8842-XYZ",
      certificateNumber: "MWU-CERT-2026-088",
      version: 1,
      qrToken: "tok_8842xyz_verify",
      generatedBy: "System Auto-Generator",
      generatedAt: "2026-07-05T16:21:00Z",
      totalVerificationCount: 0,
      lastVerifiedDate: null,
      lastVerificationLocation: null,
      documentHash: "f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2",
      status: "Generated",
      verificationLogs: []
    },
    departmentDecisions: [
      {
        id: "DD-005",
        departmentName: "Library",
        officerName: "Hanna Tefera",
        decision: "Approved",
        decisionDate: "2026-07-02T10:00:00Z",
        processingTimeDays: 1,
        documentsAttached: 0,
        auditStatus: "Clean"
      },
      {
        id: "DD-006",
        departmentName: "Accounting",
        officerName: "Ato Bekele T.",
        decision: "Approved",
        decisionDate: "2026-07-03T11:00:00Z",
        processingTimeDays: 2,
        documentsAttached: 1,
        auditStatus: "Clean"
      }
    ],
    documents: [],
    auditLogs: [],
    correctionRequests: [],
    timeline: []
  },
  {
    id: "CC-2026-003",
    clearanceNumber: "CLR-2026-9002",
    student: {
      id: "UGR/88888/11",
      name: "Chala Merera",
      photoUrl: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
      universityEmail: "chala.merera@mwu.edu.et",
      college: "College of Engineering",
      department: "Civil Engineering",
      program: "Regular Degree",
      admissionYear: "2011 EC",
    },
    type: "Graduation",
    submissionDate: "2026-05-10T10:00:00Z",
    completionDate: "2026-05-30T15:00:00Z",
    totalProcessingTimeDays: 20,
    finalApprovalDate: "2026-05-30T15:00:00Z",
    finalApprovedBy: "Dr. Samuel Tadesse (Registrar)",
    recordStatus: "Corrected",
    certificate: {
      certificateId: "CERT-7731-DEF",
      certificateNumber: "MWU-CERT-2026-042",
      version: 2,
      qrToken: "tok_7731def_verify",
      generatedBy: "Dr. Samuel Tadesse",
      generatedAt: "2026-06-10T09:30:00Z",
      totalVerificationCount: 5,
      lastVerifiedDate: "2026-07-15T11:20:00Z",
      lastVerificationLocation: "Nairobi, Kenya",
      documentHash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3",
      status: "Verified",
      verificationLogs: [
        {
          id: "VL-105",
          timestamp: "2026-07-15T11:20:00Z",
          location: "Nairobi, Kenya",
          device: "Safari Desktop",
          ipAddress: "197.232.1.1",
          status: "Valid"
        }
      ]
    },
    departmentDecisions: [],
    documents: [],
    auditLogs: [],
    correctionRequests: [
      {
        id: "CR-001",
        requestedBy: "Chala Merera",
        requestedDate: "2026-06-05T10:00:00Z",
        reason: "Misspelled middle name on certificate.",
        affectedField: "Student Name",
        originalValue: "Chala Merra",
        proposedNewValue: "Chala Merera",
        supportingEvidenceUrl: "#",
        status: "Approved",
        approvedBy: "Dr. Samuel Tadesse",
        approvalDate: "2026-06-10T09:00:00Z"
      }
    ],
    timeline: []
  }
];
