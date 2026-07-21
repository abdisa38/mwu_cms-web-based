import mongoose, { Schema, Document } from 'mongoose';

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED'
}

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  ipAddress?: string;
  loginTime: Date;
  lastActivityTime: Date;
  expiresAt: Date;
  status: SessionStatus;
}

const SessionSchema = new Schema<ISession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userAgent: { type: String },
  ipAddress: { type: String },
  loginTime: { type: Date, required: true, default: Date.now },
  lastActivityTime: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: Object.values(SessionStatus), default: SessionStatus.ACTIVE }
}, { timestamps: true });

// TTL index to automatically delete expired sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
