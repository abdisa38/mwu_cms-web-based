import mongoose, { Schema, Document } from 'mongoose';

export enum AcademicStatus {
  ACTIVE = 'ACTIVE',
  GRADUATED = 'GRADUATED',
  WITHDRAWN = 'WITHDRAWN',
  SUSPENDED = 'SUSPENDED'
}

export interface IStudent extends Document {
  user: mongoose.Types.ObjectId;
  studentId: string;
  firstName: string;
  lastName: string;
  department: mongoose.Types.ObjectId;
  enrollmentYear: number;
  academicStatus: AcademicStatus;
}

const StudentSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  enrollmentYear: {
    type: Number,
    required: true
  },
  academicStatus: {
    type: String,
    enum: Object.values(AcademicStatus),
    default: AcademicStatus.ACTIVE
  }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
