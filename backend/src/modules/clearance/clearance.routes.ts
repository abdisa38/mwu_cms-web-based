import { Router } from 'express';
import { protect, restrictTo } from '../../middlewares/auth.middleware';
import { UserRole } from '../users/user.model';
import {
  initiateClearance,
  getMyClearance,
  getPendingClearances,
  approveDepartmentClearance,
  grantFinalApproval
} from './clearance.controller';

const router = Router();

// Protect all clearance routes
router.use(protect);

// Student Routes
router.post('/initiate', restrictTo(UserRole.STUDENT), initiateClearance);
router.get('/my-clearance', restrictTo(UserRole.STUDENT), getMyClearance);

// Officer Routes
router.get('/pending', restrictTo(UserRole.OFFICER), getPendingClearances);
router.patch('/:id/approve-dept', restrictTo(UserRole.OFFICER), approveDepartmentClearance);

// Registrar Routes
router.patch('/:id/final-approve', restrictTo(UserRole.REGISTRAR, UserRole.ADMIN), grantFinalApproval);

export default router;
