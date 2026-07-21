import { z } from 'zod';
import { DocumentType } from '../models/document.model';

// File upload doesn't strictly use JSON DTO for the file, but we can validate body fields.
export const UploadDocumentDto = z.object({
  type: z.nativeEnum(DocumentType)
});

export const VerifyDocumentDto = z.object({
  action: z.enum(['VERIFY', 'REJECT']),
  reason: z.string().optional()
}).refine(data => {
  if (data.action === 'REJECT' && !data.reason) return false;
  return true;
}, {
  message: "Reason is required when rejecting a document",
  path: ["reason"]
});

export type UploadDocumentInput = z.infer<typeof UploadDocumentDto>;
export type VerifyDocumentInput = z.infer<typeof VerifyDocumentDto>;
