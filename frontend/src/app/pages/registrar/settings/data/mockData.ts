import { 
  GeneralSettings, 
  BrandingSettings, 
  AuthSettings, 
  SessionSettings, 
  ActiveSession,
  NotificationSettings,
  EmailSettings,
  StorageSettings,
  Integration,
  SystemHealthMetric,
  BackupRecord,
  FeatureFlag
} from "./types";

export const mockGeneralSettings: GeneralSettings = {
  systemName: "MWU e-Clearance System",
  shortName: "MWU e-Clearance",
  description: "Digital Clearance Management System for Madda Walabu University",
  defaultLanguage: "English",
  timezone: "Africa/Addis_Ababa",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "12-hour",
  academicYearFormat: "YYYY/YY",
  systemStatus: "Operational"
};

export const mockBrandingSettings: BrandingSettings = {
  universityName: "Madda Walabu University",
  primaryColor: "#0284c7", // MWU Blueish
  secondaryColor: "#ffffff",
  accentColor: "#f59e0b",
  footerText: "Madda Walabu University Office of the Registrar",
  copyrightText: "© 2026 Madda Walabu University. All rights reserved."
};

export const mockAuthSettings: AuthSettings = {
  studentLoginMethods: ["Student ID", "University Email"],
  staffLoginMethods: ["University Email"],
  registrarLoginMethods: ["University Email"],
  twoFactorRequirement: "Required for Registrar",
  passwordMinLength: 12,
  passwordRequireUppercase: true,
  passwordRequireLowercase: true,
  passwordRequireNumber: true,
  passwordRequireSpecial: true,
  passwordExpirationDays: 90,
  maxFailedLogins: 5,
  lockoutDurationMinutes: 30
};

export const mockSessionSettings: SessionSettings = {
  sessionDurationHours: 12,
  allowRememberMe: false,
  maxActiveSessions: 3,
  idleTimeoutMinutes: 60,
  forceLogoutOnPasswordChange: true,
  forceLogoutOnRoleChange: true
};

export const mockActiveSessions: ActiveSession[] = [
  {
    id: "SESS-8A92",
    user: "Fasil Bekele (Super Admin)",
    device: "Chrome 120 / Windows 11",
    location: "Bale Robe, Ethiopia (192.168.1.45)",
    lastActivity: "2 mins ago",
    createdAt: "2026-07-18T08:00:00Z"
  },
  {
    id: "SESS-1M44",
    user: "Fasil Bekele (Super Admin)",
    device: "Safari / iOS 17",
    location: "Addis Ababa, Ethiopia (10.4.2.1)",
    lastActivity: "4 hours ago",
    createdAt: "2026-07-17T18:30:00Z"
  }
];

export const mockNotificationSettings: NotificationSettings = {
  inAppEnabled: true,
  emailEnabled: true,
  pushEnabled: false,
  preferences: {
    clearanceStarted: true,
    approval: true,
    rejection: true,
    documentRequest: true,
    deadlineReminder: true,
    overdue: true,
    certificateGenerated: true
  },
  deliveryRetryCount: 3,
  retryDelayMinutes: 15
};

export const mockEmailSettings: EmailSettings = {
  provider: "SMTP",
  smtpHost: "smtp.office365.com",
  smtpPort: "587",
  smtpUsername: "noreply@mwu.edu.et",
  encryption: "TLS",
  fromName: "MWU e-Clearance",
  fromEmail: "noreply@mwu.edu.et",
  replyToEmail: "support@mwu.edu.et"
};

export const mockStorageSettings: StorageSettings = {
  provider: "AWS S3",
  bucket: "mwu-clearance-prod",
  region: "af-south-1",
  maxFileSizeMB: 10,
  allowedFileTypes: [".pdf", ".jpg", ".png"],
  encryptionAtRest: true
};

export const mockIntegrations: Integration[] = [
  { id: "INT-1", name: "Microsoft 365 Email", category: "Email Provider", status: "Connected", lastTested: "2 hours ago" },
  { id: "INT-2", name: "AWS S3", category: "Cloud Storage", status: "Connected", lastTested: "1 day ago" },
  { id: "INT-3", name: "Ethio Telecom SMS", category: "SMS Provider", status: "Disconnected", lastTested: "Never" },
  { id: "INT-4", name: "MWU Active Directory", category: "Identity Provider", status: "Connected", lastTested: "10 mins ago" }
];

export const mockSystemHealth: SystemHealthMetric[] = [
  { service: "Main Database (MongoDB)", status: "Operational", responseTime: "12ms", uptime: "99.99%" },
  { service: "Authentication Service", status: "Operational", responseTime: "45ms", uptime: "100%" },
  { service: "File Storage (S3)", status: "Operational", responseTime: "85ms", uptime: "99.95%" },
  { service: "PDF Generation Service", status: "Operational", responseTime: "210ms", uptime: "99.80%" },
  { service: "Email Delivery queue", status: "Degraded", responseTime: "450ms", uptime: "98.50%" },
];

export const mockBackups: BackupRecord[] = [
  { id: "BKP-20260718-00", date: "2026-07-18T00:00:00Z", size: "4.2 GB", status: "Successful", type: "Automated" },
  { id: "BKP-20260717-00", date: "2026-07-17T00:00:00Z", size: "4.1 GB", status: "Successful", type: "Automated" },
  { id: "BKP-20260716-14", date: "2026-07-16T14:30:00Z", size: "4.0 GB", status: "Successful", type: "Manual" },
];

export const mockFeatureFlags: FeatureFlag[] = [
  { id: "FF-1", name: "Certificate QR Verification", description: "Enables public QR code scanning on generated certificates", enabled: true, environment: "Production", lastUpdated: "2 weeks ago" },
  { id: "FF-2", name: "Mobile App API Sync", description: "Enables real-time sync with the experimental student mobile app", enabled: false, environment: "Production", lastUpdated: "1 month ago" },
  { id: "FF-3", name: "Automated Appeals Processing", description: "Uses rules engine to auto-reject invalid appeals", enabled: false, environment: "Production", lastUpdated: "3 days ago" },
];
