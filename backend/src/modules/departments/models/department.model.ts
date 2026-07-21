import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string;
  description?: string;
  facultyId: mongoose.Types.ObjectId;
  headId?: mongoose.Types.ObjectId;
  isActive: boolean;
  logoUrl?: string;
}

const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String },
  facultyId: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  headId: { type: Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  logoUrl: { type: String }
}, { timestamps: true });

export default mongoose.models. || mongoose.model<>('',);
