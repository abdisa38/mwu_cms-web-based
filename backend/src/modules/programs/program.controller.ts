import { Request, Response, NextFunction } from 'express';
import { ProgramService } from './services/program.service';
import { CreateProgramDto, UpdateProgramDto } from './dtos/program.dto';

const programService = new ProgramService();

export class ProgramController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CreateProgramDto.parse(req.body);
      const program = await programService.createProgram(validated);
      res.status(201).json({ success: true, data: program });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await programService.getAllPrograms(page, limit, search);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const program = await programService.getProgramById(req.params.id);
      res.status(200).json({ success: true, data: program });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = UpdateProgramDto.parse(req.body);
      const program = await programService.updateProgram(req.params.id, validated);
      res.status(200).json({ success: true, data: program });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await programService.deleteProgram(req.params.id);
      res.status(200).json({ success: true, message: 'Program deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
