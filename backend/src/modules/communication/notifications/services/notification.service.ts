import { NotificationRepository } from '../repositories/notification.repository';
import { INotification, NotificationCategory, NotificationPriority } from '../models/notification.model';
import { socketManager } from '../../../../socket/socket.manager';
import { NotFoundError } from '../../../../core/errors';

export class NotificationService {
  private repository: NotificationRepository;

  constructor() {
    this.repository = new NotificationRepository();
  }

  public async createNotification(
    recipientId: string,
    title: string,
    message: string,
    type: string,
    category: NotificationCategory = NotificationCategory.SYSTEM,
    priority: NotificationPriority = NotificationPriority.NORMAL,
    metadata?: any
  ): Promise<INotification> {
    
    const notification = await this.repository.create({
      recipientId: recipientId as any,
      title,
      message,
      type,
      category,
      priority,
      metadata
    });

    // Real-time dispatch
    socketManager.sendToUser(recipientId, 'notification:new', notification);

    return notification;
  }

  public async getMyNotifications(recipientId: string, page = 1, limit = 20, includeArchived = false) {
    const skip = (page - 1) * limit;
    const filters = includeArchived ? {} : { isArchived: false };
    
    const [notifications, total, unreadCount] = await Promise.all([
      this.repository.findByRecipient(recipientId, skip, limit, filters),
      this.repository.countByRecipient(recipientId, filters),
      this.repository.countUnread(recipientId)
    ]);

    return { notifications, meta: { page, limit, total, unreadCount } };
  }

  public async markAsRead(id: string, recipientId: string) {
    const notif = await this.repository.markAsRead(id, recipientId);
    if (!notif) throw new NotFoundError('Notification not found');
    socketManager.sendToUser(recipientId, 'notification:read', { id });
    return notif;
  }

  public async markAllAsRead(recipientId: string) {
    await this.repository.markAllAsRead(recipientId);
    socketManager.sendToUser(recipientId, 'notification:read_all', {});
  }

  public async archive(id: string, recipientId: string) {
    const notif = await this.repository.archive(id, recipientId);
    if (!notif) throw new NotFoundError('Notification not found');
    return notif;
  }

  public async delete(id: string, recipientId: string) {
    await this.repository.delete(id, recipientId);
  }
}
