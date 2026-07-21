import { Request, Response, NextFunction } from 'express';
import { auditService } from './audit/services/audit.service';
import { SettingsService } from './settings/services/settings.service';
import { HealthService } from './health/services/health.service';

const settingsService = new SettingsService();
const healthService = new HealthService();

export class AdminController {

  // --- HEALTH ---
  public getHealth(req: Request, res: Response) {
    const health = healthService.getHealthStatus();
    res.status(health.status === 'OK' ? 200 : 503).json(health);
  }

  // --- SETTINGS ---
  public async getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await settingsService.getSettings();
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  }

  public async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const settings = await settingsService.updateSettings(req.body, userId, ipAddress);
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  }

  // --- AUDIT LOGS ---
  public async getAuditLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const skip = (page - 1) * limit;

      const filters = {
        action: req.query.action,
        userId: req.query.userId,
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      const data = await auditService.getLogs(filters, skip, limit);
      res.status(200).json({ 
        success: true, 
        data: data.logs, 
        meta: { page, limit, total: data.total } 
      });
    } catch (error) {
      next(error);
    }
  }
}
