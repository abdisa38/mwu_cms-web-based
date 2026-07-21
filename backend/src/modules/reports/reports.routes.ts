import { Router } from 'express';
import { ReportsController } from './reports.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../users/user.model';

const router = Router();
const controller = new ReportsController();

router.use(authenticate);

// Dashboards
router.get('/dashboard/student', authorize(UserRole.STUDENT), controller.getStudentDashboard);
router.get('/dashboard/staff', authorize(UserRole.OFFICER), controller.getStaffDashboard);
router.get('/dashboard/registrar', authorize(UserRole.REGISTRAR, UserRole.ADMIN), controller.getRegistrarDashboard);

// Analytics
router.get('/analytics/overview', authorize(UserRole.REGISTRAR, UserRole.ADMIN), controller.getOverviewAnalytics);

// Exports
router.get('/export/clearances/csv', authorize(UserRole.REGISTRAR, UserRole.ADMIN), controller.exportClearancesCSV);
router.get('/export/clearances/excel', authorize(UserRole.REGISTRAR, UserRole.ADMIN), controller.exportClearancesExcel);

export default router;
