import { Request, Response, NextFunction } from 'express';
import { FacultyService } from './services/faculty.service';
import { CreateFacultyDto, UpdateFacultyDto } from './dtos/faculty.dto';

const facultyService = new FacultyService();

export class FacultyController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CreateFacultyDto.parse(req.body);
      const faculty = await facultyService.createFaculty(validated);
      res.status(201).json({ success: true, data: faculty });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await facultyService.getAllFaculties(page, limit, search);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const faculty = await facultyService.getFacultyById(req.params.id);
      res.status(200).json({ success: true, data: faculty });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = UpdateFacultyDto.parse(req.body);
      const faculty = await facultyService.updateFaculty(req.params.id, validated);
      res.status(200).json({ success: true, data: faculty });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await facultyService.deleteFaculty(req.params.id);
      res.status(200).json({ success: true, message: 'Faculty deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
