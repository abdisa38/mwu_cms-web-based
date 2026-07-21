import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from './services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dtos/department.dto';

const departmentService = new DepartmentService();

export class DepartmentController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CreateDepartmentDto.parse(req.body);
      const department = await departmentService.createDepartment(validated);
      res.status(201).json({ success: true, data: department });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await departmentService.getAllDepartments(page, limit, search);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await departmentService.getDepartmentById(req.params.id);
      res.status(200).json({ success: true, data: department });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = UpdateDepartmentDto.parse(req.body);
      const department = await departmentService.updateDepartment(req.params.id, validated);
      res.status(200).json({ success: true, data: department });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await departmentService.deleteDepartment(req.params.id);
      res.status(200).json({ success: true, message: 'Department deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
