import mongoose, { Schema, Document } from 'mongoose';

export enum DocumentType {
  STUDENT_ID = 'STUDENT_ID',
  GRADUATION_LETTER = 'GRADUATION_LETTER',
  TRANSFER_LETTER = 'TRANSFER_LETTER',
  WITHDRAWAL_LETTER = 'WITHDRAWAL_LETTER',
  ACADEMIC_DOCUMENT = 'ACADEMIC_DOCUMENT',
  STAFF_DOCUMENT = 'STAFF_DOCUMENT',
  PROFILE_PHOTO = 'PROFILE_PHOTO',
  OTHER = 'OTHER'
}

export enum DocumentVerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export interface IDoc extends Document {
  ownerId: mongoose.Types.ObjectId; // User ID (student or staff)
  type: DocumentType;
  fileUrl: string;
  publicId: string; // Cloudinary public ID for deletion
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  verificationStatus: DocumentVerificationStatus;
  rejectionReason?: string;
  verifiedBy?: mongoose.Types.ObjectId; // Registrar User ID
  isDeleted: boolean; // Soft delete
}

const DocumentSchema = new Schema<IDoc>({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: Object.values(DocumentType), required: true },
  fileUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  sizeBytes: { type: Number, required: true },
  verificationStatus: { type: String, enum: Object.values(DocumentVerificationStatus), default: DocumentVerificationStatus.PENDING },
  rejectionReason: { type: String },
  verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Soft delete middleware
DocumentSchema.pre<mongoose.Query<any, any>>(/^find/, function(next: any) {
  // @ts-ignore
  this.where({ isDeleted: { $ne: true } });
  next();
});

export default mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);
