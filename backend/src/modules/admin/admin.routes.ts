import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../users/user.model';

const router = Router();
const controller = new AdminController();

// Public / No-auth
router.get('/health', controller.getHealth);

// Authenticated
router.use(authenticate);
router.get('/settings', controller.getSettings); // Anyone can read settings (for UI theme, logo)

// Strict Admin/Registrar Only
router.use(authorize(UserRole.ADMIN, UserRole.REGISTRAR));

router.put('/settings', controller.updateSettings);
router.get('/audit', controller.getAuditLogs);

export default router;
