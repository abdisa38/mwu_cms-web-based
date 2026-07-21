import Program, { IProgram } from '../models/program.model';

export class ProgramRepository {
  public async create(data: any): Promise<IProgram> {
    const program = new Program(data);
    return program.save();
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IProgram[]> {
    const query = Program.find(filters).populate('departmentId', 'name code').populate('facultyId', 'name code');
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async findById(id: string): Promise<IProgram | null> {
    return Program.findById(id).populate('departmentId', 'name code').populate('facultyId', 'name code');
  }

  public async update(id: string, data: any): Promise<IProgram | null> {
    return Program.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await Program.findByIdAndDelete(id);
  }

  public async count(filters: any = {}): Promise<number> {
    return Program.countDocuments(filters);
  }
}
