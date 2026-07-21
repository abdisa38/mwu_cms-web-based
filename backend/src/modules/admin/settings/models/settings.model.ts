import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemSettings extends Document {
  universityName: string;
  logoUrl?: string;
  theme: 'light' | 'dark' | 'system';
  maintenanceMode: boolean;
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  maxUploadSizeMB: number;
  workflow: {
    autoAssignReviewers: boolean;
    defaultDeadlineDays: number;
  };
  updatedBy?: mongoose.Types.ObjectId;
}

const SystemSettingsSchema = new Schema<ISystemSettings>({
  universityName: { type: String, default: 'Madda Walabu University' },
  logoUrl: { type: String },
  theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
  maintenanceMode: { type: Boolean, default: false },
  enableEmailNotifications: { type: Boolean, default: true },
  enableSMSNotifications: { type: Boolean, default: false },
  maxUploadSizeMB: { type: Number, default: 10 },
  workflow: {
    autoAssignReviewers: { type: Boolean, default: false },
    defaultDeadlineDays: { type: Number, default: 7 }
  },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);
