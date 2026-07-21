import { Router } from 'express';
import { NotificationController } from './notification.controller';
import { authenticate } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new NotificationController();

router.use(authenticate);

router.get('/', controller.getMyNotifications);
router.patch('/read-all', controller.markAllAsRead);
router.patch('/:id/read', controller.markAsRead);
router.patch('/:id/archive', controller.archive);
router.delete('/:id', controller.delete);

export default router;
