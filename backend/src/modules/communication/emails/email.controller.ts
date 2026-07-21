import { Request, Response, NextFunction } from 'express';
import { EmailService } from './services/email.service';
import EmailQueue from './models/email.model';

const emailService = new EmailService();

export class EmailController {
  
  public async queueEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { to, subject, htmlBody } = req.body;
      const job = await emailService.queueEmail(to, subject, htmlBody);
      res.status(201).json({ success: true, data: job });
    } catch (error) {
      next(error);
    }
  }

  public async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const status = req.query.status as string;

      const filters: any = {};
      if (status) filters.status = status;

      const skip = (page - 1) * limit;

      const [logs, total] = await Promise.all([
        EmailQueue.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
        EmailQueue.countDocuments(filters)
      ]);

      res.status(200).json({ success: true, data: logs, meta: { page, limit, total } });
    } catch (error) {
      next(error);
    }
  }
}
