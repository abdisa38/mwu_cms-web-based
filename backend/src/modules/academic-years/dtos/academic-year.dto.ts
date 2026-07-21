import { z } from 'zod';

export const CreateAcademicYearDto = z.object({
  year: z.string().regex(/^\d{4}\/\d{4}$/, 'Year must be in format YYYY/YYYY (e.g., 2025/2026)'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  isCurrent: z.boolean().optional(),
  isClosed: z.boolean().optional()
});

export const UpdateAcademicYearDto = CreateAcademicYearDto.partial();

export type CreateAcademicYearInput = z.infer<typeof CreateAcademicYearDto>;
export type UpdateAcademicYearInput = z.infer<typeof UpdateAcademicYearDto>;
