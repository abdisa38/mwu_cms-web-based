export interface GeneralSettings {
  systemName: string;
  shortName: string;
  description: string;
  defaultLanguage: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  academicYearFormat: string;
  systemStatus: "Operational" | "Maintenance" | "Read-Only";
}

export interface BrandingSettings {
  universityName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  footerText: string;
  copyrightText: string;
}

export interface AuthSettings {
  studentLoginMethods: string[];
  staffLoginMethods: string[];
  registrarLoginMethods: string[];
  twoFactorRequirement: "Optional" | "Required for Registrar" | "Required for All Staff";
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumber: boolean;
  passwordRequireSpecial: boolean;
  passwordExpirationDays: number;
  maxFailedLogins: number;
  lockoutDurationMinutes: number;
}

export interface SessionSettings {
  sessionDurationHours: number;
  allowRememberMe: boolean;
  maxActiveSessions: number;
  idleTimeoutMinutes: number;
  forceLogoutOnPasswordChange: boolean;
  forceLogoutOnRoleChange: boolean;
}

export interface ActiveSession {
  id: string;
  user: string;
  device: string;
  location: string;
  lastActivity: string;
  createdAt: string;
}

export interface NotificationSettings {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  preferences: {
    clearanceStarted: boolean;
    approval: boolean;
    rejection: boolean;
    documentRequest: boolean;
    deadlineReminder: boolean;
    overdue: boolean;
    certificateGenerated: boolean;
  };
  deliveryRetryCount: number;
  retryDelayMinutes: number;
}

export interface EmailSettings {
  provider: "SMTP" | "AWS SES" | "SendGrid";
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  encryption: "TLS" | "SSL" | "None";
  fromName: string;
  fromEmail: string;
  replyToEmail: string;
}

export interface StorageSettings {
  provider: "Local Storage" | "AWS S3" | "Google Cloud Storage";
  bucket: string;
  region: string;
  maxFileSizeMB: number;
  allowedFileTypes: string[];
  encryptionAtRest: boolean;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  status: "Connected" | "Disconnected" | "Error";
  lastTested: string;
}

export interface SystemHealthMetric {
  service: string;
  status: "Operational" | "Degraded" | "Unavailable";
  responseTime: string;
  uptime: string;
}

export interface BackupRecord {
  id: string;
  date: string;
  size: string;
  status: "Successful" | "Failed";
  type: "Automated" | "Manual";
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: "Production" | "Staging";
  lastUpdated: string;
}
