import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  slug: string;
  description?: string;
  priority: number;
  permissions: string[];
  isSystemRole: boolean;
  isActive: boolean;
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  priority: { type: Number, required: true },
  permissions: [{ type: String }],
  isSystemRole: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);
