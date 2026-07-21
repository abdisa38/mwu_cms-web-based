import { Router } from 'express';
import { DocumentController } from './document.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { uploadMiddleware } from '../../middlewares/upload.middleware';
import { UserRole } from '../users/user.model';

const router = Router();
const documentController = new DocumentController();

router.use(authenticate);

// Public/Student routes
router.post('/upload', uploadMiddleware.single('file'), documentController.upload);
router.get('/my', documentController.getMyDocuments);
router.delete('/:id', documentController.delete);

// Registrar/Admin specific routes
router.get('/search', authorize(UserRole.REGISTRAR, UserRole.ADMIN, UserRole.OFFICER), documentController.search);
router.patch('/:id/verify', authorize(UserRole.REGISTRAR, UserRole.ADMIN), documentController.verify);

// Shared
router.get('/:id', documentController.getById);

export default router;
