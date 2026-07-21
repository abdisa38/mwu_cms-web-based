import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  action: string;
  user: mongoose.Types.ObjectId; // Who performed the action
  targetId?: mongoose.Types.ObjectId; // E.g., Student ID or Clearance ID affected
  targetModel?: string; // E.g., 'Clearance', 'Student'
  ipAddress?: string;
  details?: any; // JSON object with changes
}

const AuditLogSchema: Schema = new Schema({
  action: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetId: {
    type: Schema.Types.ObjectId
  },
  targetModel: {
    type: String
  },
  ipAddress: {
    type: String
  },
  details: {
    type: Schema.Types.Mixed
  }
}, { timestamps: true }); // Automatically creates createdAt timestamp

export default mongoose.models. || mongoose.model<>('',);
