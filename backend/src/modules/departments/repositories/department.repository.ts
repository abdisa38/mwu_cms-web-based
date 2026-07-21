import Department, { IDepartment } from '../models/department.model';

export class DepartmentRepository {
  public async create(data: Partial<IDepartment>): Promise<IDepartment> {
    const department = new Department(data);
    return department.save();
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IDepartment[]> {
    const query = Department.find(filters).populate('facultyId', 'name code').populate('headId', 'firstName lastName email');
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async findById(id: string): Promise<IDepartment | null> {
    return Department.findById(id).populate('facultyId', 'name code').populate('headId', 'firstName lastName email');
  }

  public async update(id: string, data: Partial<IDepartment>): Promise<IDepartment | null> {
    return Department.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await Department.findByIdAndDelete(id);
  }

  public async count(filters: any = {}): Promise<number> {
    return Department.countDocuments(filters);
  }
}
