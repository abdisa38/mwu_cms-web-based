import Certificate, { ICertificate } from '../models/certificate.model';
import VerificationLog from '../models/certificate-verification.model';

export class CertificateRepository {
  public async create(data: Partial<ICertificate>): Promise<ICertificate> {
    const cert = new Certificate(data);
    return cert.save();
  }

  public async findByCertificateNumber(certNum: string): Promise<ICertificate | null> {
    return Certificate.findOne({ certificateNumber: certNum, status: 'ACTIVE' })
      .populate('studentId', 'firstName lastName email')
      .populate('clearanceId');
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}) {
    const query = Certificate.find(filters).populate('studentId', 'firstName lastName email');
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async count(filters: any = {}) {
    return Certificate.countDocuments(filters);
  }

  public async logVerification(certificateId: string, isValid: boolean, ipAddress?: string, userAgent?: string) {
    const log = new VerificationLog({
      certificateId,
      isValid,
      ipAddress,
      userAgent
    });
    return log.save();
  }
}
