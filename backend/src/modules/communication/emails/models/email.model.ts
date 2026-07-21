import mongoose, { Schema, Document } from 'mongoose';

export enum EmailStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SENT = 'SENT',
  FAILED = 'FAILED'
}

export interface IEmailQueue extends Document {
  to: string;
  subject: string;
  htmlBody: string;
  status: EmailStatus;
  retryCount: number;
  maxRetries: number;
  lastError?: string;
  scheduledFor: Date;
  sentAt?: Date;
}

const EmailQueueSchema = new Schema<IEmailQueue>({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  htmlBody: { type: String, required: true },
  status: { type: String, enum: Object.values(EmailStatus), default: EmailStatus.PENDING },
  retryCount: { type: Number, default: 0 },
  maxRetries: { type: Number, default: 3 },
  lastError: { type: String },
  scheduledFor: { type: Date, default: Date.now },
  sentAt: { type: Date }
}, { timestamps: true });

// Index for the worker to find pending emails fast
EmailQueueSchema.index({ status: 1, scheduledFor: 1 });

export default mongoose.models.EmailQueue || mongoose.model<IEmailQueue>('EmailQueue', EmailQueueSchema);
