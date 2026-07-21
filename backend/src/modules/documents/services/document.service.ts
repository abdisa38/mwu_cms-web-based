import { DocumentRepository } from '../repositories/document.repository';
import { IDoc, DocumentType, DocumentVerificationStatus } from '../models/document.model';
import cloudinary from '../../../storage/cloudinary.config';
import { NotFoundError, BadRequestError, ForbiddenError } from '../../../core/errors';
import mongoose from 'mongoose';

export class DocumentService {
  private repository: DocumentRepository;

  constructor() {
    this.repository = new DocumentRepository();
  }

  public async uploadDocument(ownerId: string, file: Express.Multer.File, type: DocumentType): Promise<IDoc> {
    if (!file || !file.path) {
      throw new BadRequestError('File upload failed');
    }

    // Since we're using multer-storage-cloudinary, the file is already uploaded to Cloudinary
    // and `file.path` contains the secure_url. The public_id is available in `file.filename`.
    
    const docData: Partial<IDoc> = {
      ownerId: new mongoose.Types.ObjectId(ownerId) as any,
      type,
      fileUrl: file.path,
      publicId: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      verificationStatus: DocumentVerificationStatus.PENDING
    };

    return this.repository.create(docData);
  }

  public async getDocumentById(id: string): Promise<IDoc> {
    const doc = await this.repository.findById(id);
    if (!doc) throw new NotFoundError('Document not found');
    return doc;
  }

  public async getMyDocuments(ownerId: string): Promise<IDoc[]> {
    return this.repository.findAll({ ownerId: new mongoose.Types.ObjectId(ownerId) }, { sort: { createdAt: -1 } });
  }

  public async searchDocuments(page: number = 1, limit: number = 10, filters: any = {}) {
    const skip = (page - 1) * limit;
    const [documents, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { createdAt: -1 } }),
      this.repository.count(filters)
    ]);
    return { documents, meta: { page, limit, total } };
  }

  public async verifyDocument(docId: string, registrarUserId: string, action: 'VERIFY' | 'REJECT', reason?: string): Promise<IDoc> {
    const doc = await this.getDocumentById(docId);
    if (doc.verificationStatus !== DocumentVerificationStatus.PENDING) {
      throw new BadRequestError(`Document is already ${doc.verificationStatus}`);
    }

    const status = action === 'VERIFY' ? DocumentVerificationStatus.VERIFIED : DocumentVerificationStatus.REJECTED;
    
    const updateData: any = {
      verificationStatus: status,
      verifiedBy: new mongoose.Types.ObjectId(registrarUserId)
    };
    if (reason) updateData.rejectionReason = reason;

    const updated = await this.repository.update(docId, updateData);
    if (!updated) throw new NotFoundError('Document not found');

    // Emit event for notification here...
    return updated;
  }

  public async deleteDocument(docId: string, userId: string): Promise<void> {
    const doc = await this.getDocumentById(docId);
    
    if (doc.ownerId._id.toString() !== userId) {
      throw new ForbiddenError('You can only delete your own documents');
    }

    if (doc.verificationStatus === DocumentVerificationStatus.VERIFIED) {
      throw new BadRequestError('Cannot delete a verified document');
    }

    await this.repository.softDelete(docId);
  }

  public async hardDeleteDocument(docId: string): Promise<void> {
    const doc = await this.repository.restore(docId); // Just to fetch it even if deleted
    if (!doc) throw new NotFoundError('Document not found');

    // Remove from Cloudinary
    await cloudinary.uploader.destroy(doc.publicId);
    
    // Hard delete from DB
    await doc.deleteOne();
  }
}
