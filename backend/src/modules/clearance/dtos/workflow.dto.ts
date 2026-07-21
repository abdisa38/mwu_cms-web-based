import { z } from 'zod';

export const ProcessWorkflowDto = z.object({
  departmentId: z.string().min(24).max(24).optional(), // Optional for registrar final approval
  action: z.enum(['APPROVE', 'REJECT', 'RETURN']),
  remarks: z.string().optional()
});

export type ProcessWorkflowInput = z.infer<typeof ProcessWorkflowDto>;
