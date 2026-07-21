import { Router } from 'express';
import { AppealController } from './appeal.controller';
import { authenticate, authorize } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../users/user.model';

const router = Router();
const controller = new AppealController();

router.use(authenticate);

// Student Routes
router.post('/', authorize(UserRole.STUDENT), controller.submitAppeal);
router.get('/my', authorize(UserRole.STUDENT), controller.getMyAppeals);

// Department / Admin Routes
router.get('/department/:departmentId', authorize(UserRole.STAFF, UserRole.DEPARTMENT_HEAD, UserRole.ADMIN), controller.getDepartmentAppeals);
router.patch('/:id/review', authorize(UserRole.STAFF, UserRole.DEPARTMENT_HEAD, UserRole.REGISTRAR, UserRole.ADMIN), controller.reviewAppeal);

export default router;
