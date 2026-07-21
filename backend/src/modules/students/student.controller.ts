import { Request, Response, NextFunction } from 'express';
import { StudentService } from './services/student.service';
import { CreateStudentDto, UpdateStudentDto } from './dtos/student.dto';

const studentService = new StudentService();

export class StudentController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CreateStudentDto.parse(req.body);
      const student = await studentService.createStudent(validated);
      res.status(201).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await studentService.getAllStudents(page, limit, search);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = UpdateStudentDto.parse(req.body);
      const student = await studentService.updateStudent(req.params.id, validated);
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await studentService.deleteStudent(req.params.id);
      res.status(200).json({ success: true, message: 'Student soft-deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async restore(req: Request, res: Response, next: NextFunction) {
    try {
      await studentService.restoreStudent(req.params.id);
      res.status(200).json({ success: true, message: 'Student restored successfully' });
    } catch (error) {
      next(error);
    }
  }
}
