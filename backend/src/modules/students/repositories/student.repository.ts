import Student, { IStudent } from '../models/student.model';

export class StudentRepository {
  public async create(data: Partial<IStudent>): Promise<IStudent> {
    const student = new Student(data);
    return student.save();
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IStudent[]> {
    const query = Student.find(filters)
      .populate('userId', 'firstName lastName email status')
      .populate('programId', 'name code')
      .populate('batchId', 'year');
      
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async findById(id: string): Promise<IStudent | null> {
    return Student.findById(id)
      .populate('userId', 'firstName lastName email status')
      .populate('programId', 'name code')
      .populate('batchId', 'year');
  }

  public async update(id: string, data: Partial<IStudent>): Promise<IStudent | null> {
    return Student.findByIdAndUpdate(id, data, { new: true });
  }

  public async softDelete(id: string): Promise<void> {
    await Student.findByIdAndUpdate(id, { isDeleted: true });
  }

  public async restore(id: string): Promise<void> {
    await Student.updateOne({ _id: id }, { isDeleted: false });
  }

  public async count(filters: any = {}): Promise<number> {
    return Student.countDocuments(filters);
  }
}
