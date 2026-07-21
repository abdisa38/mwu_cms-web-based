import { z } from 'zod';

export const CreateDepartmentDto = z.object({
  name: z.string().min(3).max(100),
  code: z.string().min(2).max(20),
  description: z.string().optional(),
  facultyId: z.string().min(24).max(24),
  headId: z.string().min(24).max(24).optional(),
  isActive: z.boolean().optional()
});

export const UpdateDepartmentDto = CreateDepartmentDto.partial();

export type CreateDepartmentInput = z.infer<typeof CreateDepartmentDto>;
export type UpdateDepartmentInput = z.infer<typeof UpdateDepartmentDto>;
