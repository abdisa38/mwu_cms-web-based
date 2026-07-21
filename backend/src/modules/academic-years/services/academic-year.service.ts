import { AcademicYearRepository } from '../repositories/academic-year.repository';
import { CreateAcademicYearInput, UpdateAcademicYearInput } from '../dtos/academic-year.dto';
import { BadRequestError, NotFoundError } from '../../../core/errors';

export class AcademicYearService {
  private repository: AcademicYearRepository;

  constructor() {
    this.repository = new AcademicYearRepository();
  }

  public async createAcademicYear(data: CreateAcademicYearInput) {
    const existing = await this.repository.findAll({ year: data.year });
    if (existing.length > 0) throw new BadRequestError('Academic year already exists');
    
    if (data.isCurrent) {
      await this.repository.unsetCurrentYear();
    }
    
    return this.repository.create(data);
  }

  public async getAllAcademicYears(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [years, total] = await Promise.all([
      this.repository.findAll({}, { skip, limit, sort: { startDate: -1 } }),
      this.repository.count({})
    ]);

    return { academicYears: years, meta: { page, limit, total } };
  }

  public async getAcademicYearById(id: string) {
    const year = await this.repository.findById(id);
    if (!year) throw new NotFoundError('Academic year not found');
    return year;
  }

  public async updateAcademicYear(id: string, data: UpdateAcademicYearInput) {
    if (data.isCurrent) {
      await this.repository.unsetCurrentYear();
    }
    const year = await this.repository.update(id, data);
    if (!year) throw new NotFoundError('Academic year not found');
    return year;
  }
}
