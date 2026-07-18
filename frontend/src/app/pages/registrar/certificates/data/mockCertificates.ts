import { CertificateRecord } from "./types";

export const mockCertificates: CertificateRecord[] = [
  {
    id: "CERT-001",
    studentName: "Abebe Kebede",
    studentId: "UGR/1020/12",
    universityEmail: "abebe.kebede@student.mwu.edu.et",
    college: "Computing and Informatics",
    department: "Computer Science",
    program: "BSc in Computer Science",
    certificateNumber: "MWU-EC-2026-000001",
    clearanceNumber: "CLR-2026-001",
    clearanceType: "Graduation",
    issueDate: "2026-07-15T10:30:00Z",
    certificateVersion: 1,
    verificationStatus: "Verified",
    certificateStatus: "Active",
    lastVerified: "2026-07-18T09:15:00Z",
    verificationToken: "vk_7823fha89we",
    issuedBy: "Dr. Aster Tadesse (Registrar)",
    versions: [
      {
        id: "V1-001",
        versionNumber: 1,
        createdDate: "2026-07-15T10:30:00Z",
        createdBy: "System",
        reason: "Initial Issuance",
        status: "Active",
        documentHash: "0x8f4...3b2a"
      }
    ],
    verificationHistory: [
      {
        id: "VH-001",
        date: "2026-07-18T09:15:00Z",
        result: "Valid",
        method: "QR Code",
        location: "Addis Ababa, ET",
        ip: "196.189.12.34",
        userAgent: "Mozilla/5.0 (iPhone)"
      }
    ],
    downloadHistory: [
      {
        id: "DL-001",
        date: "2026-07-15T11:00:00Z",
        downloadedBy: "Abebe Kebede",
        method: "Direct",
        device: "Windows Desktop",
        location: "Bale Robe, ET",
        status: "Success"
      }
    ],
    correctionRequests: []
  },
  {
    id: "CERT-002",
    studentName: "Chaltu Merga",
    studentId: "UGR/1543/12",
    universityEmail: "chaltu.m@student.mwu.edu.et",
    college: "Business and Economics",
    department: "Accounting",
    program: "BA in Accounting",
    certificateNumber: null,
    clearanceNumber: "CLR-2026-045",
    clearanceType: "Graduation",
    issueDate: null,
    certificateVersion: 0,
    verificationStatus: "Never Verified",
    certificateStatus: "Pending Generation",
    lastVerified: null,
    verificationToken: null,
    issuedBy: null,
    versions: [],
    verificationHistory: [],
    downloadHistory: [],
    correctionRequests: []
  },
  {
    id: "CERT-003",
    studentName: "Dawit Alemu",
    studentId: "UGR/2001/13",
    universityEmail: "dawit.alemu@student.mwu.edu.et",
    college: "Engineering",
    department: "Civil Engineering",
    program: "BSc in Civil Engineering",
    certificateNumber: "MWU-EC-2026-000003",
    clearanceNumber: "CLR-2026-112",
    clearanceType: "Withdrawal",
    issueDate: "2026-06-20T14:20:00Z",
    certificateVersion: 2,
    verificationStatus: "Never Verified",
    certificateStatus: "Regenerated",
    lastVerified: null,
    verificationToken: "vk_x912masd78",
    issuedBy: "Dr. Aster Tadesse (Registrar)",
    versions: [
      {
        id: "V1-003",
        versionNumber: 1,
        createdDate: "2026-06-18T10:00:00Z",
        createdBy: "System",
        reason: "Initial Issuance",
        status: "Archived",
        documentHash: "0x1a2...4c5d"
      },
      {
        id: "V2-003",
        versionNumber: 2,
        createdDate: "2026-06-20T14:20:00Z",
        createdBy: "Registrar Admin",
        reason: "Name Spelling Correction",
        status: "Active",
        documentHash: "0x5d4...9e8f"
      }
    ],
    verificationHistory: [],
    downloadHistory: [],
    correctionRequests: [
      {
        id: "CR-001",
        originalValue: "Dawit Alem",
        correctedValue: "Dawit Alemu",
        reason: "Typo in original submission",
        requestedBy: "Dawit Alemu",
        requestedDate: "2026-06-19T09:00:00Z",
        status: "Approved",
        approvedBy: "Registrar Admin",
        approvalDate: "2026-06-20T14:00:00Z"
      }
    ]
  },
  {
    id: "CERT-004",
    studentName: "Tigist Bekele",
    studentId: "UGR/3321/11",
    universityEmail: "tigist.b@student.mwu.edu.et",
    college: "Natural Sciences",
    department: "Biology",
    program: "BSc in Biology",
    certificateNumber: "MWU-EC-2025-000891",
    clearanceNumber: "CLR-2025-891",
    clearanceType: "Graduation",
    issueDate: "2025-07-20T09:00:00Z",
    certificateVersion: 1,
    verificationStatus: "Revoked",
    certificateStatus: "Revoked",
    lastVerified: "2026-01-10T11:00:00Z",
    verificationToken: "vk_revoked123",
    issuedBy: "Dr. Aster Tadesse (Registrar)",
    versions: [
      {
        id: "V1-004",
        versionNumber: 1,
        createdDate: "2025-07-20T09:00:00Z",
        createdBy: "System",
        reason: "Initial Issuance",
        status: "Revoked",
        documentHash: "0x98b...1a2c"
      }
    ],
    verificationHistory: [
      {
        id: "VH-004",
        date: "2026-01-10T11:00:00Z",
        result: "Revoked",
        method: "Public Verification",
        location: "Nairobi, KE",
        ip: "102.22.45.67",
        userAgent: "Chrome/91 (Windows)"
      }
    ],
    downloadHistory: [],
    correctionRequests: []
  }
];
