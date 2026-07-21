import { Request, Response, NextFunction } from 'express';
import { ClearanceService } from './services/clearance.service';
import { CreateClearanceDto } from './dtos/clearance.dto';
import { TimelineService } from './services/timeline.service';

const clearanceService = new ClearanceService();
const timelineService = new TimelineService();

export class ClearanceController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      // In a real app with Auth middleware, req.user holds the decoded JWT.
      const userId = (req as any).user.id; 
      // Also need the student's Document ID. Typically, the user record points to the student record, 
      // or we query it. For now, we assume it's passed or attached to user.
      const studentDocId = req.body.studentId; // Temporary: passed from client until user <-> student strict binding is in req.user
      
      const validated = CreateClearanceDto.parse(req.body);
      const clearance = await clearanceService.initiateClearance(userId, studentDocId, validated);
      res.status(201).json({ success: true, data: clearance });
    } catch (error) {
      next(error);
    }
  }

  public async getMyClearances(req: Request, res: Response, next: NextFunction) {
    try {
      const studentDocId = (req as any).query.studentId; // Temp
      const clearances = await clearanceService.getMyClearances(studentDocId);
      res.status(200).json({ success: true, data: clearances });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const clearance = await clearanceService.getClearanceDetails(req.params.id);
      res.status(200).json({ success: true, data: clearance });
    } catch (error) {
      next(error);
    }
  }

  public async getTimeline(req: Request, res: Response, next: NextFunction) {
    try {
      const timeline = await timelineService.getClearanceTimeline(req.params.id);
      res.status(200).json({ success: true, data: timeline });
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
      if (req.query.type) filters.type = req.query.type;

      const result = await clearanceService.searchClearances(page, limit, filters);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      await clearanceService.cancelClearance(req.params.id, userId);
      res.status(200).json({ success: true, message: 'Clearance cancelled successfully' });
    } catch (error) {
      next(error);
    }
  }
}
