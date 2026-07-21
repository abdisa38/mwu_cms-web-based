import { Router } from 'express';
import { EmailController } from './email.controller';
import { authenticate, authorize } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../users/user.model';

const router = Router();
const controller = new EmailController();

router.use(authenticate);
router.use(authorize(UserRole.ADMIN, UserRole.REGISTRAR));

router.post('/send', controller.queueEmail);
router.get('/logs', controller.getLogs);

export default router;
