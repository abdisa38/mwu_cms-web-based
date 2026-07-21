import mongoose, { Schema, Document } from 'mongoose';

export enum ClearanceType {
  GRADUATION = 'GRADUATION',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  ACADEMIC_DISMISSAL = 'ACADEMIC_DISMISSAL',
  STAFF_CLEARANCE = 'STAFF_CLEARANCE'
}

export enum ClearanceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface IClearance extends Document {
  studentId: mongoose.Types.ObjectId;
  type: ClearanceType;
  status: ClearanceStatus;
  progress: number;
  reason?: string; // e.g. for Withdrawal or Transfer
  workflowId: mongoose.Types.ObjectId; // Reference to the Workflow Instance
  createdAt: Date;
  updatedAt: Date;
}

const ClearanceSchema = new Schema<IClearance>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  type: { type: String, enum: Object.values(ClearanceType), required: true },
  status: { type: String, enum: Object.values(ClearanceStatus), default: ClearanceStatus.PENDING },
  progress: { type: Number, default: 0 },
  reason: { type: String },
  workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow' }
}, { timestamps: true });

// A student can only have one active clearance at a time
ClearanceSchema.index(
  { studentId: 1 }, 
  { 
    unique: true, 
    partialFilterExpression: { 
      status: { $in: [ClearanceStatus.PENDING, ClearanceStatus.IN_PROGRESS] } 
    } 
  }
);

export default mongoose.model<IClearance>('Clearance', ClearanceSchema);
