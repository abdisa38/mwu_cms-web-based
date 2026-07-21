import { Request, Response, NextFunction } from 'express';
import { NotificationService } from './services/notification.service';

const notificationService = new NotificationService();

export class NotificationController {
  
  public async getMyNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const includeArchived = req.query.includeArchived === 'true';

      const result = await notificationService.getMyNotifications(userId, page, limit, includeArchived);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  public async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const notif = await notificationService.markAsRead(req.params.id as string, userId);
      res.status(200).json({ success: true, data: notif });
    } catch (error) {
      next(error);
    }
  }

  public async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      await notificationService.markAllAsRead(userId);
      res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
      next(error);
    }
  }

  public async archive(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      const notif = await notificationService.archive(req.params.id as string, userId);
      res.status(200).json({ success: true, data: notif });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId || (req as any).user.id;
      await notificationService.delete(req.params.id as string, userId);
      res.status(200).json({ success: true, message: 'Notification deleted' });
    } catch (error) {
      next(error);
    }
  }
}
