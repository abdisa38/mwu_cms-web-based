import { Request, Response, NextFunction } from 'express';
import { AppealService } from './services/appeal.service';

const appealService = new AppealService();

export class AppealController {

  public async submitAppeal(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = (req as any).user.userId || (req as any).user.id;
      const { clearanceId, departmentId, reason, attachments } = req.body;
      const appeal = await appealService.submitAppeal(studentId, clearanceId, departmentId, reason, attachments);
      res.status(201).json({ success: true, data: appeal });
    } catch (error) {
      next(error);
    }
  }

  public async getMyAppeals(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = (req as any).user.userId || (req as any).user.id;
      const appeals = await appealService.getStudentAppeals(studentId);
      res.status(200).json({ success: true, data: appeals });
    } catch (error) {
      next(error);
    }
  }

  public async getDepartmentAppeals(req: Request, res: Response, next: NextFunction) {
    try {
      const departmentId = req.params.departmentId as string;
      const status = req.query.status as string;
      const appeals = await appealService.getDepartmentAppeals(departmentId, status);
      res.status(200).json({ success: true, data: appeals });
    } catch (error) {
      next(error);
    }
  }

  public async reviewAppeal(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewerId = (req as any).user.userId || (req as any).user.id;
      const appealId = req.params.id as string;
      const { status, notes } = req.body;
      const appeal = await appealService.reviewAppeal(appealId, reviewerId, status, notes);
      res.status(200).json({ success: true, data: appeal });
    } catch (error) {
      next(error);
    }
  }
}
