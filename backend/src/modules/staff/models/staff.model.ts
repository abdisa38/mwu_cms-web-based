import mongoose, { Schema, Document } from 'mongoose';

export enum StaffStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED'
}

export interface IStaff extends Document {
  userId: mongoose.Types.ObjectId;
  employeeId: string;
  departmentId?: mongoose.Types.ObjectId; // E.g. Registrar staff might not have a department
  status: StaffStatus;
  isDeleted: boolean;
}

const StaffSchema = new Schema<IStaff>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  employeeId: { type: String, required: true, unique: true, uppercase: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
  status: { type: String, enum: Object.values(StaffStatus), default: StaffStatus.ACTIVE },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

StaffSchema.pre(/^find/, function(next: any) {
  // @ts-ignore
  this.where({ isDeleted: { $ne: true } });
  next();
});

export default mongoose.model<IStaff>('Staff', StaffSchema);
