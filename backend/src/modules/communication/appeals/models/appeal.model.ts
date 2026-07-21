import mongoose, { Schema, Document } from 'mongoose';

export enum AppealStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface IAppeal extends Document {
  studentId: mongoose.Types.ObjectId;
  clearanceId: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;
  reason: string;
  attachments?: string[];
  status: AppealStatus;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewNotes?: string;
  reviewedAt?: Date;
}

const AppealSchema = new Schema<IAppeal>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clearanceId: { type: Schema.Types.ObjectId, ref: 'Clearance', required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  reason: { type: String, required: true },
  attachments: [{ type: String }],
  status: { type: String, enum: Object.values(AppealStatus), default: AppealStatus.PENDING },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewNotes: { type: String },
  reviewedAt: { type: Date }
}, { timestamps: true });

export default mongoose.model<IAppeal>('Appeal', AppealSchema);
