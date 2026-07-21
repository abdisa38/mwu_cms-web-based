import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  certificateNumber: string; // Unique alphanumeric string
  studentId: mongoose.Types.ObjectId;
  clearanceId: mongoose.Types.ObjectId;
  pdfUrl: string; // Cloudinary secure_url for the PDF
  pdfPublicId: string;
  qrCodeUrl: string; // The data string or Cloudinary URL for the QR image
  issueDate: Date;
  status: 'ACTIVE' | 'REVOKED';
}

const CertificateSchema = new Schema<ICertificate>({
  certificateNumber: { type: String, required: true, unique: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clearanceId: { type: Schema.Types.ObjectId, ref: 'Clearance', required: true, unique: true },
  pdfUrl: { type: String, required: true },
  pdfPublicId: { type: String, required: true },
  qrCodeUrl: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['ACTIVE', 'REVOKED'], default: 'ACTIVE' }
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
