import { Request, Response, NextFunction } from 'express';
import { CertificateService } from './services/certificate.service';

const certificateService = new CertificateService();

export class CertificateController {
  
  // Internal/Admin manual trigger (usually it's event-driven)
  public async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId, clearanceId, studentName, clearanceType } = req.body;
      const cert = await certificateService.generateCertificate(studentId, clearanceId, studentName, clearanceType);
      res.status(201).json({ success: true, data: cert });
    } catch (error) {
      next(error);
    }
  }

  public async getMyCertificates(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const certs = await certificateService.getMyCertificates(userId);
      res.status(200).json({ success: true, data: certs });
    } catch (error) {
      next(error);
    }
  }

  public async search(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const filters: any = {};
      if (req.query.status) filters.status = req.query.status;

      const result = await certificateService.searchCertificates(page, limit, filters);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  // Public Endpoint (No Auth required)
  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const ip = req.ip;
      const userAgent = req.headers['user-agent'];
      
      const result = await certificateService.verifyCertificate(req.params.certificateNumber as string, ip, userAgent);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
