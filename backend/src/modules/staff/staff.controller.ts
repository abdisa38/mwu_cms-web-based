import { Request, Response, NextFunction } from 'express';
import { StaffService } from './services/staff.service';
import { CreateStaffDto, UpdateStaffDto } from './dtos/staff.dto';

const staffService = new StaffService();

export class StaffController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CreateStaffDto.parse(req.body);
      const staff = await staffService.createStaff(validated);
      res.status(201).json({ success: true, data: staff });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await staffService.getAllStaff(page, limit, search);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const staff = await staffService.getStaffById((req.params.id as string));
      res.status(200).json({ success: true, data: staff });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = UpdateStaffDto.parse(req.body);
      const staff = await staffService.updateStaff((req.params.id as string), validated);
      res.status(200).json({ success: true, data: staff });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await staffService.deleteStaff((req.params.id as string));
      res.status(200).json({ success: true, message: 'Staff soft-deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async restore(req: Request, res: Response, next: NextFunction) {
    try {
      await staffService.restoreStaff((req.params.id as string));
      res.status(200).json({ success: true, message: 'Staff restored successfully' });
    } catch (error) {
      next(error);
    }
  }
}
