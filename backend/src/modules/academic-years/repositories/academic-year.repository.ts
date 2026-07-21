import AcademicYear, { IAcademicYear } from '../models/academic-year.model';

export class AcademicYearRepository {
  public async create(data: any): Promise<IAcademicYear> {
    const year = new AcademicYear(data);
    return year.save();
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IAcademicYear[]> {
    const query = AcademicYear.find(filters);
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async findById(id: string): Promise<IAcademicYear | null> {
    return AcademicYear.findById(id);
  }

  public async update(id: string, data: any): Promise<IAcademicYear | null> {
    return AcademicYear.findByIdAndUpdate(id, data, { new: true });
  }

  public async unsetCurrentYear(): Promise<void> {
    await AcademicYear.updateMany({ isCurrent: true }, { isCurrent: false });
  }

  public async count(filters: any = {}): Promise<number> {
    return AcademicYear.countDocuments(filters);
  }
}
