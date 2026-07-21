import { z } from 'zod';

export const CreateFacultyDto = z.object({
  name: z.string().min(3).max(100),
  code: z.string().min(2).max(10),
  description: z.string().optional(),
  isActive: z.boolean().optional()
});

export const UpdateFacultyDto = CreateFacultyDto.partial();

export type CreateFacultyInput = z.infer<typeof CreateFacultyDto>;
export type UpdateFacultyInput = z.infer<typeof UpdateFacultyDto>;
