import Clearance, { IClearance, ClearanceStatus } from '../models/clearance.model';

export class ClearanceRepository {
  public async create(data: any): Promise<IClearance> {
    const clearance = new Clearance(data);
    return clearance.save();
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IClearance[]> {
    const query = Clearance.find(filters)
      .populate('studentId', 'studentId userId')
      .populate('workflowId');
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async findById(id: string): Promise<IClearance | null> {
    return Clearance.findById(id)
      .populate('studentId', 'studentId userId')
      .populate({
        path: 'workflowId',
        populate: { path: 'stages.departmentId', select: 'name code' }
      });
  }

  public async update(id: string, data: any): Promise<IClearance | null> {
    return Clearance.findByIdAndUpdate(id, data, { new: true });
  }

  public async checkActiveClearance(studentId: string): Promise<boolean> {
    const active = await Clearance.findOne({
      studentId,
      status: { $in: [ClearanceStatus.PENDING, ClearanceStatus.IN_PROGRESS] }
    });
    return !!active;
  }
}
