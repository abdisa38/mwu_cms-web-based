import { FacultyRepository } from '../repositories/faculty.repository';
import { CreateFacultyInput, UpdateFacultyInput } from '../dtos/faculty.dto';
import { BadRequestError, NotFoundError } from '../../../core/errors';

export class FacultyService {
  private repository: FacultyRepository;

  constructor() {
    this.repository = new FacultyRepository();
  }

  public async createFaculty(data: CreateFacultyInput) {
    const existing = await this.repository.findAll({ $or: [{ name: data.name }, { code: data.code }] });
    if (existing.length > 0) throw new BadRequestError('Faculty with this name or code already exists');
    
    return this.repository.create(data);
  }

  public async getAllFaculties(page: number = 1, limit: number = 10, search?: string) {
    const filters: any = {};
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    const [faculties, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { name: 1 } }),
      this.repository.count(filters)
    ]);

    return { faculties, meta: { page, limit, total } };
  }

  public async getFacultyById(id: string) {
    const faculty = await this.repository.findById(id);
    if (!faculty) throw new NotFoundError('Faculty not found');
    return faculty;
  }

  public async updateFaculty(id: string, data: UpdateFacultyInput) {
    const faculty = await this.repository.update(id, data);
    if (!faculty) throw new NotFoundError('Faculty not found');
    return faculty;
  }

  public async deleteFaculty(id: string) {
    const faculty = await this.repository.findById(id);
    if (!faculty) throw new NotFoundError('Faculty not found');
    // TODO: Check if any departments belong to this faculty before deleting
    await this.repository.delete(id);
  }
}
