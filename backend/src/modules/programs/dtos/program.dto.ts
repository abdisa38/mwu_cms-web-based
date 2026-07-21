import { z } from 'zod';
import { DegreeType } from '../models/program.model';

export const CreateProgramDto = z.object({
  name: z.string().min(3).max(100),
  code: z.string().min(2).max(20),
  departmentId: z.string().min(24).max(24),
  facultyId: z.string().min(24).max(24),
  degreeType: z.nativeEnum(DegreeType),
  durationYears: z.number().min(1).max(7),
  isActive: z.boolean().optional()
});

export const UpdateProgramDto = CreateProgramDto.partial();

export type CreateProgramInput = z.infer<typeof CreateProgramDto>;
export type UpdateProgramInput = z.infer<typeof UpdateProgramDto>;
