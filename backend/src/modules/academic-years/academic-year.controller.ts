import { Request, Response, NextFunction } from 'express';
import { AcademicYearService } from './services/academic-year.service';
import { CreateAcademicYearDto, UpdateAcademicYearDto } from './dtos/academic-year.dto';

const academicYearService = new AcademicYearService();

export class AcademicYearController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CreateAcademicYearDto.parse(req.body);
      const year = await academicYearService.createAcademicYear(validated);
      res.status(201).json({ success: true, data: year });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await academicYearService.getAllAcademicYears(page, limit);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const year = await academicYearService.getAcademicYearById(req.params.id);
      res.status(200).json({ success: true, data: year });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = UpdateAcademicYearDto.parse(req.body);
      const year = await academicYearService.updateAcademicYear(req.params.id, validated);
      res.status(200).json({ success: true, data: year });
    } catch (error) {
      next(error);
    }
  }
}
