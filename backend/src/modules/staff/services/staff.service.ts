import { StaffRepository } from '../repositories/staff.repository';
import { CreateStaffInput, UpdateStaffInput } from '../dtos/staff.dto';
import { AuthRepository } from '../../auth/repositories/auth.repository';
import { BadRequestError, NotFoundError } from '../../../core/errors';
import mongoose from 'mongoose';

export class StaffService {
  private repository: StaffRepository;
  private authRepository: AuthRepository;

  constructor() {
    this.repository = new StaffRepository();
    this.authRepository = new AuthRepository();
  }

  public async createStaff(data: CreateStaffInput) {
    const existing = await this.repository.findAll({ employeeId: data.employeeId });
    if (existing.length > 0) throw new BadRequestError('Employee ID already exists');
    
    const role = await this.authRepository.findRoleBySlug(data.roleSlug);
    if (!role) throw new BadRequestError(`Role '${data.roleSlug}' not found in DB`);

    const user = await this.authRepository.createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash: 'defaultPassword123!', 
      roleId: role._id as mongoose.Types.ObjectId,
      userId: data.employeeId
    });

    const staffData: any = {
      ...data,
      userId: user._id as mongoose.Types.ObjectId
    };

    if (data.departmentId) {
      staffData.departmentId = new mongoose.Types.ObjectId(data.departmentId);
    }

    return this.repository.create(staffData);
  }

  public async getAllStaff(page: number = 1, limit: number = 10, search?: string) {
    const filters: any = {};
    if (search) {
      filters.employeeId = { $regex: search, $options: 'i' };
    }
    
    const skip = (page - 1) * limit;
    const [staffList, total] = await Promise.all([
      this.repository.findAll(filters, { skip, limit, sort: { createdAt: -1 } }),
      this.repository.count(filters)
    ]);

    return { staff: staffList, meta: { page, limit, total } };
  }

  public async getStaffById(id: string) {
    const staff = await this.repository.findById(id);
    if (!staff) throw new NotFoundError('Staff not found');
    return staff;
  }

  public async updateStaff(id: string, data: UpdateStaffInput) {
    const updateData: any = { ...data };
    if (data.departmentId) {
      updateData.departmentId = new mongoose.Types.ObjectId(data.departmentId);
    }
    const staff = await this.repository.update(id, updateData);
    if (!staff) throw new NotFoundError('Staff not found');
    return staff;
  }

  public async deleteStaff(id: string) {
    await this.repository.softDelete(id);
  }

  public async restoreStaff(id: string) {
    await this.repository.restore(id);
  }
}
