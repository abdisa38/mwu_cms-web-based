import { DepartmentRepository } from '../repositories/department.repository';
import { CreateDepartmentInput, UpdateDepartmentInput } from '../dtos/department.dto';
import { BadRequestError, NotFoundError } from '../../../core/errors';

export class DepartmentService {
  private repository: DepartmentRepository;

  constructor() {
    this.repository = new DepartmentRepository();
  }

  public async createDepartment(data: CreateDepartmentInput) {
    const existing = await this.repository.findAll({ $or: [{ name: data.name }, { code: data.code }] });
    if (existing.length > 0) throw new BadRequestError('Department with this name or code already exists');
    
    return this.repository.create(data);
  }

  public async getAllDepartments(page: number = 1, limit: number = 10, search?: string) {
    const filters: any = {};
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    const [departments, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { name: 1 } }),
      this.repository.count(filters)
    ]);

    return { departments, meta: { page, limit, total } };
  }

  public async getDepartmentById(id: string) {
    const department = await this.repository.findById(id);
    if (!department) throw new NotFoundError('Department not found');
    return department;
  }

  public async updateDepartment(id: string, data: UpdateDepartmentInput) {
    const department = await this.repository.update(id, data);
    if (!department) throw new NotFoundError('Department not found');
    return department;
  }

  public async deleteDepartment(id: string) {
    const department = await this.repository.findById(id);
    if (!department) throw new NotFoundError('Department not found');
    await this.repository.delete(id);
  }
}
