import { StudentRepository } from '../repositories/student.repository';
import { CreateStudentInput, UpdateStudentInput } from '../dtos/student.dto';
import { AuthRepository } from '../../auth/repositories/auth.repository';
import { BadRequestError, NotFoundError } from '../../../core/errors';
import mongoose from 'mongoose';

export class StudentService {
  private repository: StudentRepository;
  private authRepository: AuthRepository;

  constructor() {
    this.repository = new StudentRepository();
    this.authRepository = new AuthRepository();
  }

  public async createStudent(data: CreateStudentInput) {
    const existing = await this.repository.findAll({ studentId: data.studentId });
    if (existing.length > 0) throw new BadRequestError('Student ID already exists');
    
    // Create underlying User account
    const role = await this.authRepository.findRoleBySlug('student');
    if (!role) throw new BadRequestError('Student role not found in DB');

    const user = await this.authRepository.createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash: 'defaultPassword123!', // Should be auto-generated and emailed
      roleId: role._id as mongoose.Types.ObjectId,
      userId: data.studentId
    });

    return this.repository.create({
      ...data,
      userId: user._id as mongoose.Types.ObjectId,
      programId: new mongoose.Types.ObjectId(data.programId),
      batchId: new mongoose.Types.ObjectId(data.batchId)
    });
  }

  public async getAllStudents(page: number = 1, limit: number = 10, search?: string) {
    const filters: any = {};
    if (search) {
      filters.studentId = { $regex: search, $options: 'i' };
      // Note: searching by name requires aggregation/join with users collection or a text index on a flattened field. 
    }
    
    const skip = (page - 1) * limit;
    const [students, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { createdAt: -1 } }),
      this.repository.count(filters)
    ]);

    return { students, meta: { page, limit, total } };
  }

  public async getStudentById(id: string) {
    const student = await this.repository.findById(id);
    if (!student) throw new NotFoundError('Student not found');
    return student;
  }

  public async updateStudent(id: string, data: UpdateStudentInput) {
    const student = await this.repository.update(id, data);
    if (!student) throw new NotFoundError('Student not found');
    return student;
  }

  public async deleteStudent(id: string) {
    await this.repository.softDelete(id);
  }

  public async restoreStudent(id: string) {
    await this.repository.restore(id);
  }
}
