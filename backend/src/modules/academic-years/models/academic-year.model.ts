import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicYear extends Document {
  year: string; // e.g., '2025/2026'
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  isClosed: boolean;
}

const AcademicYearSchema = new Schema<IAcademicYear>({
  year: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isCurrent: { type: Boolean, default: false },
  isClosed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.AcademicYear || mongoose.model<IAcademicYear>('AcademicYear', AcademicYearSchema);
