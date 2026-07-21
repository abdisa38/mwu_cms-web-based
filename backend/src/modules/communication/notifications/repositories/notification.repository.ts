import Notification, { INotification } from '../models/notification.model';
import mongoose from 'mongoose';

export class NotificationRepository {
  public async create(data: Partial<INotification>): Promise<INotification> {
    return (new Notification(data)).save();
  }

  public async findByRecipient(recipientId: string, skip = 0, limit = 20, filters: any = {}) {
    const query = { recipientId: new mongoose.Types.ObjectId(recipientId), ...filters };
    return Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
  }

  public async countByRecipient(recipientId: string, filters: any = {}) {
    const query = { recipientId: new mongoose.Types.ObjectId(recipientId), ...filters };
    return Notification.countDocuments(query);
  }

  public async countUnread(recipientId: string) {
    return Notification.countDocuments({ 
      recipientId: new mongoose.Types.ObjectId(recipientId), 
      isRead: false,
      isArchived: false 
    });
  }

  public async markAsRead(id: string, recipientId: string): Promise<INotification | null> {
    return Notification.findOneAndUpdate(
      { _id: id, recipientId: new mongoose.Types.ObjectId(recipientId) },
      { isRead: true, readAt: new Date() },
      { new: true }
    );
  }

  public async markAllAsRead(recipientId: string): Promise<void> {
    await Notification.updateMany(
      { recipientId: new mongoose.Types.ObjectId(recipientId), isRead: false },
      { $set: { isRead: true, readAt: new Date() } }
    );
  }

  public async delete(id: string, recipientId: string): Promise<void> {
    await Notification.findOneAndDelete({ _id: id, recipientId: new mongoose.Types.ObjectId(recipientId) });
  }

  public async archive(id: string, recipientId: string): Promise<INotification | null> {
    return Notification.findOneAndUpdate(
      { _id: id, recipientId: new mongoose.Types.ObjectId(recipientId) },
      { isArchived: true },
      { new: true }
    );
  }
}
