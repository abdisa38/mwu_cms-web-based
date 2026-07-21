import mongoose, { Schema, Document } from 'mongoose';

export enum WorkflowStageStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  RETURNED = 'RETURNED' // Returned to student for revision
}

export interface IWorkflowStage {
  departmentId: mongoose.Types.ObjectId; // E.g., Library, Cafe, Faculty
  order: number;
  status: WorkflowStageStatus;
  approverId?: mongoose.Types.ObjectId; // Staff User ID who approved/rejected
  remarks?: string;
  approvedAt?: Date;
}

export interface IWorkflow extends Document {
  clearanceId: mongoose.Types.ObjectId;
  stages: IWorkflowStage[];
  currentStageOrder: number;
  isComplete: boolean;
  registrarFinalStatus: WorkflowStageStatus; // Final overarching approval
}

const WorkflowStageSchema = new Schema<IWorkflowStage>({
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  order: { type: Number, required: true },
  status: { type: String, enum: Object.values(WorkflowStageStatus), default: WorkflowStageStatus.PENDING },
  approverId: { type: Schema.Types.ObjectId, ref: 'User' },
  remarks: { type: String },
  approvedAt: { type: Date }
});

const WorkflowSchema = new Schema<IWorkflow>({
  clearanceId: { type: Schema.Types.ObjectId, ref: 'Clearance', required: true },
  stages: { type: [WorkflowStageSchema], required: true },
  currentStageOrder: { type: Number, default: 1 },
  isComplete: { type: Boolean, default: false },
  registrarFinalStatus: { type: String, enum: Object.values(WorkflowStageStatus), default: WorkflowStageStatus.PENDING }
}, { timestamps: true });

export default mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
