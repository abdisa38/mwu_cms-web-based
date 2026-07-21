import { Request, Response, NextFunction } from 'express';
import { DocumentService } from './services/document.service';
import { UploadDocumentDto, VerifyDocumentDto } from './dtos/document.dto';

const documentService = new DocumentService();

export class DocumentController {
  public async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const validated = UploadDocumentDto.parse(req.body);
      
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file provided' });
      }

      const doc = await documentService.uploadDocument(userId, req.file, validated.type);
      res.status(201).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  }

  public async getMyDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const docs = await documentService.getMyDocuments(userId);
      res.status(200).json({ success: true, data: docs });
    } catch (error) {
      next(error);
    }
  }

  public async search(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const filters: any = {};
      if (req.query.status) filters.verificationStatus = req.query.status;
      if (req.query.type) filters.type = req.query.type;
      if (req.query.ownerId) filters.ownerId = req.query.ownerId;

      const result = await documentService.searchDocuments(page, limit, filters);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await documentService.getDocumentById(req.params.id as string);
      res.status(200).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const registrarId = (req as any).user.id;
      const validated = VerifyDocumentDto.parse(req.body);

      const doc = await documentService.verifyDocument(
        req.params.id as string, 
        registrarId, 
        validated.action, 
        validated.reason
      );
      res.status(200).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      await documentService.deleteDocument(req.params.id as string, userId);
      res.status(200).json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
