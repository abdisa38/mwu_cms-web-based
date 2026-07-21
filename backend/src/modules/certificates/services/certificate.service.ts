import { CertificateRepository } from '../repositories/certificate.repository';
import { PDFService } from './pdf.service';
import { QRService } from './qr.service';
import cloudinary from '../../../storage/cloudinary.config';
import { NotFoundError, BadRequestError } from '../../../core/errors';
import mongoose from 'mongoose';
import crypto from 'crypto';

export class CertificateService {
  private repository: CertificateRepository;
  private pdfService: PDFService;
  private qrService: QRService;

  constructor() {
    this.repository = new CertificateRepository();
    this.pdfService = new PDFService();
    this.qrService = new QRService();
  }

  /**
   * Generates a completely new certificate, uploads it to Cloudinary, and saves to DB.
   * This is typically called by the Workflow Engine upon Registrar Final Approval.
   */
  public async generateCertificate(
    studentId: string, 
    clearanceId: string, 
    studentName: string, 
    clearanceType: string
  ) {
    // 1. Generate unique Cert Number
    const certNumber = `MWU-CERT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    
    // 2. The URL that anyone can scan to verify this certificate
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify/${certNumber}`;

    // 3. Generate QR Code containing the verifyUrl
    const qrDataUrl = await this.qrService.generateQRCode(verifyUrl);

    // 4. Generate PDF buffer
    const pdfBuffer = await this.pdfService.generateCertificatePDF({
      certificateNumber: certNumber,
      studentName,
      studentId: studentId, // Could be the literal student ID string (e.g. UGR/123/12)
      clearanceType,
      issueDate: new Date().toLocaleDateString(),
      qrCodeDataUri: qrDataUrl
    });

    // 5. Upload PDF buffer directly to Cloudinary via stream
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'mwu_certificates', format: 'pdf' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(pdfBuffer);
    });

    // 6. Save Certificate to DB
    const certificate = await this.repository.create({
      certificateNumber: certNumber,
      studentId: new mongoose.Types.ObjectId(studentId),
      clearanceId: new mongoose.Types.ObjectId(clearanceId),
      pdfUrl: uploadResult.secure_url,
      pdfPublicId: uploadResult.public_id,
      qrCodeUrl: qrDataUrl, // Or upload QR to cloudinary too and store url
      issueDate: new Date(),
      status: 'ACTIVE'
    });

    return certificate;
  }

  /**
   * Public Verification Endpoint
   */
  public async verifyCertificate(certNumber: string, ipAddress?: string, userAgent?: string) {
    const cert = await this.repository.findByCertificateNumber(certNumber);
    
    if (!cert) {
      // Log failed attempt if we don't have a valid cert ID? 
      // We can't log to a specific certificate if it doesn't exist, so just throw.
      throw new NotFoundError('Invalid Certificate Number');
    }

    // Log the successful verification scan
    await this.repository.logVerification(cert._id as string, true, ipAddress, userAgent);

    return {
      isValid: true,
      certificateNumber: cert.certificateNumber,
      issueDate: cert.issueDate,
      student: cert.studentId, // populates name etc
      pdfUrl: cert.pdfUrl
    };
  }

  public async getMyCertificates(studentId: string) {
    return this.repository.findAll({ studentId: new mongoose.Types.ObjectId(studentId) }, { sort: { createdAt: -1 } });
  }

  public async searchCertificates(page: number = 1, limit: number = 10, filters: any = {}) {
    const skip = (page - 1) * limit;
    const [certificates, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { createdAt: -1 } }),
      this.repository.count(filters)
    ]);
    return { certificates, meta: { page, limit, total } };
  }
}
