import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificateVerification extends Document {
  certificateId: mongoose.Types.ObjectId;
  verifiedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isValid: boolean;
}

const CertificateVerificationSchema = new Schema<ICertificateVerification>({
  certificateId: { type: Schema.Types.ObjectId, ref: 'Certificate', required: true },
  verifiedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
  isValid: { type: Boolean, required: true }
}, { timestamps: true });

export default mongoose.models. || mongoose.model<>('',);
