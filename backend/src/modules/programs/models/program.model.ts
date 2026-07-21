import mongoose, { Schema, Document } from 'mongoose';

export enum DegreeType {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  PHD = 'PHD',
  CERTIFICATE = 'CERTIFICATE'
}

export interface IProgram extends Document {
  name: string;
  code: string;
  departmentId: mongoose.Types.ObjectId;
  facultyId: mongoose.Types.ObjectId;
  degreeType: DegreeType;
  durationYears: number;
  isActive: boolean;
}

const ProgramSchema = new Schema<IProgram>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  facultyId: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  degreeType: { type: String, enum: Object.values(DegreeType), required: true },
  durationYears: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
