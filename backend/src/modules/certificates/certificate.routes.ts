import { Router } from 'express';
import { CertificateController } from './certificate.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { UserRole } from '../auth/models/user.model';

const router = Router();
const certificateController = new CertificateController();

// Public Verification Endpoint
router.get('/verify/:certificateNumber', certificateController.verify);

// Protected Routes
router.use(authenticate);

// Student Route
router.get('/my', certificateController.getMyCertificates);

// Registrar/Admin Routes
router.post('/generate', authorize(UserRole.REGISTRAR, UserRole.ADMIN), certificateController.generate);
router.get('/search', authorize(UserRole.REGISTRAR, UserRole.ADMIN), certificateController.search);

export default router;
