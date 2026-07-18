export type ActionStatus = "Successful" | "Failed" | "Blocked" | "Pending";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  role: string;
  department: string;
  action: string;
  actionCategory: string;
  resourceType: string;
  resourceId: string;
  status: ActionStatus;
  ipAddress: string;
  device: string;
  browser: string;
  os: string;
  sessionId: string;
  integrityHash: string;
  
  // For updates
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
  
  // For failures
  failureReason?: string;
}

export interface SecurityEvent {
  id: string;
  eventType: string;
  timestamp: string;
  user: string;
  ipAddress: string;
  device: string;
  riskLevel: RiskLevel;
  actionTaken: string;
  resolutionStatus: "Resolved" | "Investigating" | "Open";
  relatedAccount: string;
}

export interface AuditKPIs {
  totalEvents: number;
  eventsToday: number;
  eventsThisWeek: number;
  successfulActions: number;
  failedActions: number;
  securityEvents: number;
  permissionChanges: number;
  accountChanges: number;
}
