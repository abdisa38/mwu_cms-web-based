import { z } from 'zod';
import { StaffStatus } from '../models/staff.model';

export const CreateStaffDto = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  employeeId: z.string().min(3),
  departmentId: z.string().min(24).max(24).optional(),
  status: z.nativeEnum(StaffStatus).optional(),
  roleSlug: z.string().default('department_staff')
});

export const UpdateStaffDto = CreateStaffDto.partial();

export type CreateStaffInput = z.infer<typeof CreateStaffDto>;
export type UpdateStaffInput = z.infer<typeof UpdateStaffDto>;
