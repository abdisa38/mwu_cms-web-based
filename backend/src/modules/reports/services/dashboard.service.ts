import mongoose from 'mongoose';
import Clearance, { ClearanceStatus } from '../../clearance/models/clearance.model';
import Workflow from '../../clearance/models/workflow.model';
import Certificate from '../../certificates/models/certificate.model';
import User from '../../users/user.model';
import Department from '../../departments/department.model';
import { NotificationRepository } from '../../communication/notifications/repositories/notification.repository';
import { MessageService } from '../../communication/messages/services/message.service';

export class DashboardService {
  private notifRepo = new NotificationRepository();
  private messageService = new MessageService();

  /**
   * Constructs the Student Dashboard View
   */
  public async getStudentDashboard(studentId: string) {
    const [currentClearance, certificates, unreadNotifs, convos] = await Promise.all([
      Clearance.findOne({ studentId, status: { $ne: ClearanceStatus.COMPLETED } }).sort({ createdAt: -1 }),
      Certificate.find({ studentId }),
      this.notifRepo.countUnread(studentId),
      this.messageService.getMyConversations(studentId)
    ]);

    let workflow = null;
    let progress = 0;
    
    if (currentClearance) {
      workflow = await Workflow.findOne({ clearanceId: currentClearance._id }).populate('stages.departmentId', 'name code');
      if (workflow && workflow.stages.length > 0) {
        const approvedCount = workflow.stages.filter((s: any) => s.status === 'APPROVED').length;
        progress = Math.round((approvedCount / workflow.stages.length) * 100);
      }
    }

    return {
      currentClearance,
      workflow,
      progress,
      certificatesCount: certificates.length,
      unreadNotifications: unreadNotifs,
      activeConversations: convos.length
    };
  }

  /**
   * Constructs the Department Staff Dashboard View
   */
  public async getStaffDashboard(departmentId: string, staffId: string) {
    const deptObjId = new mongoose.Types.ObjectId(departmentId);

    // Aggregate pending requests for this specific department
    const pendingRequests = await Workflow.aggregate([
      { $match: { status: 'ACTIVE' } },
      { $unwind: '$stages' },
      { $match: { 'stages.departmentId': deptObjId, 'stages.isCurrent': true, 'stages.status': 'PENDING' } },
      { $count: 'total' }
    ]);

    const totalPending = pendingRequests[0]?.total || 0;

    // Aggregate approved requests by this department today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const approvedToday = await Workflow.aggregate([
      { $unwind: '$stages' },
      { $match: { 
        'stages.departmentId': deptObjId, 
        'stages.status': 'APPROVED',
        'stages.approvedAt': { $gte: startOfToday }
      }},
      { $count: 'total' }
    ]);

    const totalApprovedToday = approvedToday[0]?.total || 0;

    return {
      pendingRequests: totalPending,
      approvedToday: totalApprovedToday,
      departmentId
    };
  }

  /**
   * Constructs the Registrar/Admin Dashboard View
   */
  public async getRegistrarDashboard() {
    const [
      totalStudents,
      totalClearances,
      pendingClearances,
      completedClearances,
      certificatesGenerated
    ] = await Promise.all([
      User.countDocuments({ role: 'STUDENT', isActive: true } as any),
      Clearance.countDocuments(),
      Clearance.countDocuments({ status: { $in: [ClearanceStatus.PENDING, ClearanceStatus.IN_PROGRESS] } }),
      Clearance.countDocuments({ status: ClearanceStatus.COMPLETED }),
      Certificate.countDocuments()
    ]);

    return {
      systemOverview: {
        totalStudents,
        totalClearances,
        pendingClearances,
        completedClearances,
        certificatesGenerated
      }
    };
  }
}
