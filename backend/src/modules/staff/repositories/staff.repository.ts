import Staff, { IStaff } from '../models/staff.model';

export class StaffRepository {
  public async create(data: Partial<IStaff>): Promise<IStaff> {
    const staff = new Staff(data);
    return staff.save();
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IStaff[]> {
    const query = Staff.find(filters)
      .populate('userId', 'firstName lastName email status')
      .populate('departmentId', 'name code');
      
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async findById(id: string): Promise<IStaff | null> {
    return Staff.findById(id)
      .populate('userId', 'firstName lastName email status')
      .populate('departmentId', 'name code');
  }

  public async update(id: string, data: Partial<IStaff>): Promise<IStaff | null> {
    return Staff.findByIdAndUpdate(id, data, { new: true });
  }

  public async softDelete(id: string): Promise<void> {
    await Staff.findByIdAndUpdate(id, { isDeleted: true });
  }

  public async restore(id: string): Promise<void> {
    await Staff.updateOne({ _id: id }, { isDeleted: false });
  }

  public async count(filters: any = {}): Promise<number> {
    return Staff.countDocuments(filters);
  }
}
