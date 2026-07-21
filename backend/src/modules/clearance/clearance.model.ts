import mongoose, { Schema, Document } from 'mongoose';

export enum ClearanceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface IDepartmentApproval {
  department: mongoose.Types.ObjectId;
  status: ClearanceStatus;
  approvedBy?: mongoose.Types.ObjectId;
  remarks?: string;
  approvedAt?: Date;
}

export interface IClearance extends Document {
  student: mongoose.Types.ObjectId;
  status: ClearanceStatus;
  currentStep: number;
  departmentApprovals: IDepartmentApproval[];
  finalApprovalBy?: mongoose.Types.ObjectId;
  certificateGenerated: boolean;
}

const DepartmentApprovalSchema = new Schema<IDepartmentApproval>({
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  status: { type: String, enum: Object.values(ClearanceStatus), default: ClearanceStatus.PENDING },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'Staff' },
  remarks: { type: String },
  approvedAt: { type: Date }
}, { _id: false });

const ClearanceSchema: Schema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    unique: true // Usually one active clearance per student
  },
  status: {
    type: String,
    enum: Object.values(ClearanceStatus),
    default: ClearanceStatus.PENDING
  },
  currentStep: {
    type: Number,
    default: 1
  },
  departmentApprovals: [DepartmentApprovalSchema],
  finalApprovalBy: {
    type: Schema.Types.ObjectId,
    ref: 'Staff'
  },
  certificateGenerated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.DepartmentApproval || mongoose.model<IDepartmentApproval>('DepartmentApproval', DepartmentApprovalSchema);
