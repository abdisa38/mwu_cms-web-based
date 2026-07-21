import mongoose, { Schema, Document } from 'mongoose';

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum NotificationCategory {
  SYSTEM = 'SYSTEM',
  CLEARANCE = 'CLEARANCE',
  CERTIFICATE = 'CERTIFICATE',
  MESSAGE = 'MESSAGE',
  APPEAL = 'APPEAL'
}

export interface INotification extends Document {
  recipientId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: string; // The specific event type e.g. 'department:approved'
  category: NotificationCategory;
  priority: NotificationPriority;
  metadata?: any; // e.g. { clearanceId: "..." }
  isRead: boolean;
  readAt?: Date;
  isArchived: boolean;
}

const NotificationSchema = new Schema<INotification>({
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, enum: Object.values(NotificationCategory), default: NotificationCategory.SYSTEM },
  priority: { type: String, enum: Object.values(NotificationPriority), default: NotificationPriority.NORMAL },
  metadata: { type: Schema.Types.Mixed },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date },
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', NotificationSchema);
