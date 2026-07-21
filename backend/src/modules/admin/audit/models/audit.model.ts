import mongoose, { Schema, Document } from 'mongoose';

export enum AuditAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  CREATE_ROLE = 'CREATE_ROLE',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  WORKFLOW_CHANGED = 'WORKFLOW_CHANGED',
  CLEARANCE_APPROVED = 'CLEARANCE_APPROVED',
  CLEARANCE_REJECTED = 'CLEARANCE_REJECTED',
  CERTIFICATE_GENERATED = 'CERTIFICATE_GENERATED',
  BACKUP_CREATED = 'BACKUP_CREATED',
  MAINTENANCE_TOGGLED = 'MAINTENANCE_TOGGLED'
}

export interface IAuditLog extends Document {
  userId?: mongoose.Types.ObjectId;
  action: AuditAction | string;
  entity?: string;
  entityId?: mongoose.Types.ObjectId;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entity: { type: String },
  entityId: { type: Schema.Types.ObjectId },
  metadata: { type: Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String }
}, { timestamps: { updatedAt: false } }); // Audit logs are immutable, no updatedAt

// Index for fast searching
AuditLogSchema.index({ userId: 1, action: 1 });
AuditLogSchema.index({ createdAt: -1 });

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
