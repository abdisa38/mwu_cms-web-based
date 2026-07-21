import mongoose, { Schema, Document } from 'mongoose';

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  GRADUATED = 'GRADUATED',
  WITHDRAWN = 'WITHDRAWN',
  TRANSFERRED = 'TRANSFERRED',
  DISMISSED = 'DISMISSED'
}

export interface IStudent extends Document {
  userId: mongoose.Types.ObjectId;
  studentId: string;
  programId: mongoose.Types.ObjectId;
  batchId: mongoose.Types.ObjectId;
  status: StudentStatus;
  idCardUrl?: string;
  isDeleted: boolean; // Soft delete
}

const StudentSchema = new Schema<IStudent>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  studentId: { type: String, required: true, unique: true, uppercase: true },
  programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
  status: { type: String, enum: Object.values(StudentStatus), default: StudentStatus.ACTIVE },
  idCardUrl: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Prevent finding soft-deleted students by default
StudentSchema.pre(/^find/, function(next) {
  // @ts-ignore
  this.where({ isDeleted: { $ne: true } });
  next();
});

export default mongoose.model<IStudent>('Student', StudentSchema);
