import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export enum UserRole {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  DEPT_HEAD = 'DEPT_HEAD',
  OFFICER = 'OFFICER',
  ADMIN = 'ADMIN',
}

export interface IUser extends Document {
  email: string;
  password?: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  departmentId?: mongoose.Types.ObjectId;
  studentId?: string; // e.g. UGR/1234/12
  isActive: boolean;
  refreshToken?: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.STUDENT },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    studentId: { type: String },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
