import { z } from 'zod';
import { StudentStatus } from '../models/student.model';

export const CreateStudentDto = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  studentId: z.string().min(5),
  programId: z.string().min(24).max(24),
  batchId: z.string().min(24).max(24),
  status: z.nativeEnum(StudentStatus).optional(),
  idCardUrl: z.string().url().optional()
});

export const UpdateStudentDto = CreateStudentDto.partial();

export type CreateStudentInput = z.infer<typeof CreateStudentDto>;
export type UpdateStudentInput = z.infer<typeof UpdateStudentDto>;
