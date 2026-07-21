import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  logoUrl?: string;
}

const FacultySchema = new Schema<IFaculty>({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  logoUrl: { type: String }
}, { timestamps: true });

export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);
