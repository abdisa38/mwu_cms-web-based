import mongoose, { Schema, Document } from 'mongoose';
import { hashPassword, comparePassword } from '../../../utils/crypto.util';

export enum UserStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  VERIFIED = 'VERIFIED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  LOCKED = 'LOCKED',
  DISABLED = 'DISABLED'
}

export interface IUser extends Document {
  userId: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  roleId: mongoose.Types.ObjectId;
  departmentId?: mongoose.Types.ObjectId;
  status: UserStatus;
  failedLoginAttempts: number;
  lockoutUntil?: Date;
  lastLoginAt?: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
  status: { type: String, enum: Object.values(UserStatus), default: UserStatus.PENDING_VERIFICATION },
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date },
  lastLoginAt: { type: Date }
}, { timestamps: true });

UserSchema.pre<IUser>('save', async function () {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await hashPassword(this.passwordHash);
  }
});

UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return comparePassword(candidate, this.passwordHash);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
