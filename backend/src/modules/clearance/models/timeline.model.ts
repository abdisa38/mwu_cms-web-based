import mongoose, { Schema, Document } from 'mongoose';

export enum TimelineEventType {
  CREATED = 'CREATED',
  DEPARTMENT_APPROVED = 'DEPARTMENT_APPROVED',
  DEPARTMENT_REJECTED = 'DEPARTMENT_REJECTED',
  RETURNED = 'RETURNED',
  RESUBMITTED = 'RESUBMITTED',
  REGISTRAR_APPROVED = 'REGISTRAR_APPROVED',
  REGISTRAR_REJECTED = 'REGISTRAR_REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface ITimeline extends Document {
  clearanceId: mongoose.Types.ObjectId;
  eventType: TimelineEventType;
  actorId: mongoose.Types.ObjectId; // User who performed the action
  departmentId?: mongoose.Types.ObjectId; // If the action was department-specific
  comment?: string;
  createdAt: Date;
}

const TimelineSchema = new Schema<ITimeline>({
  clearanceId: { type: Schema.Types.ObjectId, ref: 'Clearance', required: true },
  eventType: { type: String, enum: Object.values(TimelineEventType), required: true },
  actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
  comment: { type: String }
}, { timestamps: true });

export default mongoose.models.Timeline || mongoose.model<ITimeline>('Timeline', TimelineSchema);
