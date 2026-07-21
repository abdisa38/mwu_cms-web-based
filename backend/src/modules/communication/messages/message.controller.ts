import { Request, Response, NextFunction } from 'express';
import { MessageService } from './services/message.service';

const messageService = new MessageService();

export class MessageController {
  
  public async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const convos = await messageService.getMyConversations(userId);
      res.status(200).json({ success: true, data: convos });
    } catch (error) {
      next(error);
    }
  }

  public async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const conversationId = req.params.conversationId;
      const skip = parseInt(req.query.skip as string) || 0;
      
      const messages = await messageService.getMessages(conversationId, userId, skip);
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      next(error);
    }
  }

  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const { conversationId, content } = req.body;
      const msg = await messageService.sendMessage(userId, conversationId, content);
      res.status(201).json({ success: true, data: msg });
    } catch (error) {
      next(error);
    }
  }

  public async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const { participantId, clearanceId } = req.body;
      const convo = await messageService.getOrCreateConversation([userId, participantId], clearanceId);
      res.status(201).json({ success: true, data: convo });
    } catch (error) {
      next(error);
    }
  }

  public async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const conversationId = req.params.conversationId;
      await messageService.markAsRead(conversationId, userId);
      res.status(200).json({ success: true, message: 'Messages marked as read' });
    } catch (error) {
      next(error);
    }
  }
}
