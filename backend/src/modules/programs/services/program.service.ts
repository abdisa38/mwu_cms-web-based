import { ProgramRepository } from '../repositories/program.repository';
import { CreateProgramInput, UpdateProgramInput } from '../dtos/program.dto';
import { BadRequestError, NotFoundError } from '../../../core/errors';

export class ProgramService {
  private repository: ProgramRepository;

  constructor() {
    this.repository = new ProgramRepository();
  }

  public async createProgram(data: CreateProgramInput) {
    const existing = await this.repository.findAll({ code: data.code });
    if (existing.length > 0) throw new BadRequestError('Program with this code already exists');
    
    return this.repository.create(data);
  }

  public async getAllPrograms(page: number = 1, limit: number = 10, search?: string) {
    const filters: any = {};
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    const [programs, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { name: 1 } }),
      this.repository.count(filters)
    ]);

    return { programs, meta: { page, limit, total } };
  }

  public async getProgramById(id: string) {
    const program = await this.repository.findById(id);
    if (!program) throw new NotFoundError('Program not found');
    return program;
  }

  public async updateProgram(id: string, data: UpdateProgramInput) {
    const program = await this.repository.update(id, data);
    if (!program) throw new NotFoundError('Program not found');
    return program;
  }

  public async deleteProgram(id: string) {
    const program = await this.repository.findById(id);
    if (!program) throw new NotFoundError('Program not found');
    await this.repository.delete(id);
  }
}
