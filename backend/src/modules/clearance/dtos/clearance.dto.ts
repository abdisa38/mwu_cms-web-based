import { z } from 'zod';
import { ClearanceType } from '../models/clearance.model';

export const CreateClearanceDto = z.object({
  type: z.nativeEnum(ClearanceType),
  reason: z.string().optional()
});

export type CreateClearanceInput = z.infer<typeof CreateClearanceDto>;
