import Appeal, { IAppeal, AppealStatus } from '../models/appeal.model';
import { socketManager } from '../../../../socket/socket.manager';
import { NotFoundError, BadRequestError } from '../../../../core/errors';
import mongoose from 'mongoose';
import { NotificationService } from '../../notifications/services/notification.service';
import { NotificationCategory, NotificationPriority } from '../../notifications/models/notification.model';

export class AppealService {
  private notifService: NotificationService;

  constructor() {
    this.notifService = new NotificationService();
  }

  public async submitAppeal(studentId: string, clearanceId: string, departmentId: string, reason: string, attachments?: string[]): Promise<IAppeal> {
    const existing = await Appeal.findOne({ clearanceId, departmentId, status: AppealStatus.PENDING });
    if (existing) throw new BadRequestError('You already have a pending appeal for this department');

    const appeal = await (new Appeal({
      studentId, clearanceId, departmentId, reason, attachments
    })).save();

    socketManager.broadcast('appeal:submitted', appeal);

    // Ideally we notify the department head here. Assuming we can query it or emit a generic event.

    return appeal;
  }

  public async getStudentAppeals(studentId: string) {
    return Appeal.find({ studentId }).sort({ createdAt: -1 })
      .populate('departmentId', 'name code')
      .populate('clearanceId');
  }

  public async getDepartmentAppeals(departmentId: string, status?: string) {
    const filters: any = { departmentId };
    if (status) filters.status = status;
    return Appeal.find(filters).sort({ createdAt: -1 }).populate('studentId', 'firstName lastName studentId profileUrl');
  }

  public async reviewAppeal(appealId: string, reviewerId: string, status: AppealStatus.APPROVED | AppealStatus.REJECTED, notes: string): Promise<IAppeal> {
    const appeal = await Appeal.findById(appealId);
    if (!appeal) throw new NotFoundError('Appeal not found');
    if (appeal.status === AppealStatus.APPROVED || appeal.status === AppealStatus.REJECTED) {
      throw new BadRequestError('Appeal has already been decided');
    }

    appeal.status = status;
    appeal.reviewedBy = new mongoose.Types.ObjectId(reviewerId);
    appeal.reviewNotes = notes;
    appeal.reviewedAt = new Date();
    await appeal.save();

    // Notify the student
    socketManager.sendToUser(appeal.studentId.toString(), 'appeal:reviewed', appeal);
    
    await this.notifService.createNotification(
      appeal.studentId.toString(),
      `Appeal ${status}`,
      `Your appeal has been ${status.toLowerCase()}`,
      'appeal:reviewed',
      NotificationCategory.APPEAL,
      status === AppealStatus.APPROVED ? NotificationPriority.HIGH : NotificationPriority.URGENT,
      { appealId: appeal._id }
    );

    return appeal;
  }
}
