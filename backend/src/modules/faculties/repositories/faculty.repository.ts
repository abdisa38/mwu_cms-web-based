import Faculty, { IFaculty } from '../models/faculty.model';

export class FacultyRepository {
  public async create(data: any): Promise<IFaculty> {
    const faculty = new Faculty(data);
    return faculty.save();
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IFaculty[]> {
    const query = Faculty.find(filters);
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async findById(id: string): Promise<IFaculty | null> {
    return Faculty.findById(id);
  }

  public async update(id: string, data: any): Promise<IFaculty | null> {
    return Faculty.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await Faculty.findByIdAndDelete(id);
  }

  public async count(filters: any = {}): Promise<number> {
    return Faculty.countDocuments(filters);
  }
}
