import mongoose, { Schema, Document } from 'mongoose';

export interface IStaff extends Document {
  user: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  department: mongoose.Types.ObjectId;
  title: string;
  signatureUrl?: string; // S3 or local path for automated signing
}

const StaffSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
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
  title: {
    type: String,
    required: true,
    trim: true
  },
  signatureUrl: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model<IStaff>('Staff', StaffSchema);
