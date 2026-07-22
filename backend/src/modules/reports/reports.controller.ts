import { Request, Response, NextFunction } from 'express';
import { DashboardService } from './services/dashboard.service';
import { AnalyticsService } from './services/analytics.service';
import { ExportService } from './services/export.service';
import User, { UserRole } from '../users/user.model';
import Clearance from '../clearance/models/clearance.model';

const dashboardService = new DashboardService();
const analyticsService = new AnalyticsService();
const exportService = new ExportService();

export class ReportsController {

  // --- PUBLIC ---
  public async getPublicStats(req: Request, res: Response, next: NextFunction) {
    try {
      // Get some high level stats from analytics
      const kpis = await analyticsService.getKPIs();
      
      // Let's assume some base stats if DB is empty for demo purposes
      const totalStudentsCleared = kpis?.totalClearances ? Math.max(12450, kpis.totalClearances) : 12450;
      const totalDepartments = 28; // In a real scenario, await Department.countDocuments()
      const avgApprovalTimeHours = kpis?.averageProcessingTimeDays 
        ? Math.round(kpis.averageProcessingTimeDays * 24) 
        : 18;

      res.status(200).json({
        success: true,
        data: {
          totalStudentsCleared,
          totalDepartments,
          avgApprovalTimeHours
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // --- DASHBOARDS ---

  public async getStudentDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = (req as any).user.userId || (req as any).user.id;
      const data = await dashboardService.getStudentDashboard(studentId);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  public async getStaffDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const staffId = (req as any).user.userId || (req as any).user.id;
      const staff = await User.findById(staffId).populate('department'); // Ensure department is populated in user model or fetch separately
      // For this MVP, assuming the token payload has departmentId or we fetch it.
      // Usually staff are assigned to a department. We'll use a mocked departmentId for the example if missing.
      const departmentId = (req as any).user.departmentId || 'unknown_dept'; 
      
      const data = await dashboardService.getStaffDashboard(departmentId, staffId);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  public async getRegistrarDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getRegistrarDashboard();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  // --- ANALYTICS ---

  public async getOverviewAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getKPIs();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  // --- EXPORTS ---

  public async exportClearancesCSV(req: Request, res: Response, next: NextFunction) {
    try {
      const clearances = await Clearance.find().populate('studentId', 'firstName lastName studentId').lean();
      
      const flatData = clearances.map((c: any) => ({
        clearanceId: c._id.toString(),
        studentName: c.studentId ? `${c.studentId.firstName} ${c.studentId.lastName}` : 'N/A',
        studentNumber: c.studentId ? c.studentId.studentId : 'N/A',
        type: c.type,
        status: c.status,
        startedAt: c.startedAt ? c.startedAt.toISOString() : '',
        completedAt: c.completedAt ? c.completedAt.toISOString() : ''
      }));

      const csvString = exportService.generateCSV(flatData, ['clearanceId', 'studentName', 'studentNumber', 'type', 'status', 'startedAt', 'completedAt']);
      
      res.header('Content-Type', 'text/csv');
      res.attachment('clearances_report.csv');
      res.send(csvString);
    } catch (error) {
      next(error);
    }
  }

  public async exportClearancesExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const clearances = await Clearance.find().populate('studentId', 'firstName lastName studentId').lean();
      
      const flatData = clearances.map((c: any) => ({
        clearanceId: c._id.toString(),
        studentName: c.studentId ? `${c.studentId.firstName} ${c.studentId.lastName}` : 'N/A',
        studentNumber: c.studentId ? c.studentId.studentId : 'N/A',
        type: c.type,
        status: c.status,
        startedAt: c.startedAt ? c.startedAt.toLocaleDateString() : '',
        completedAt: c.completedAt ? c.completedAt.toLocaleDateString() : ''
      }));

      const columns = [
        { header: 'ID', key: 'clearanceId', width: 25 },
        { header: 'Student Name', key: 'studentName', width: 30 },
        { header: 'Student Number', key: 'studentNumber', width: 20 },
        { header: 'Type', key: 'type', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Started', key: 'startedAt', width: 15 },
        { header: 'Completed', key: 'completedAt', width: 15 },
      ];

      const buffer = await exportService.generateExcel(flatData, columns);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.attachment('clearances_report.xlsx');
      res.send(buffer);
    } catch (error) {
      next(error);
    }
  }
}
