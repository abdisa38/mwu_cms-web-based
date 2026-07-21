import { Router } from 'express';
import { ClearanceController } from './clearance.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const clearanceController = new ClearanceController();

router.use(authenticate);

// Student/General Routes
router.post('/', clearanceController.create);
router.get('/my', clearanceController.getMyClearances);

// Registrar/Admin Routes
router.get('/search', clearanceController.search);

// Shared specific routes
router.get('/:id', clearanceController.getById);
router.get('/:id/timeline', clearanceController.getTimeline);
router.patch('/:id/cancel', clearanceController.cancel);

export default router;
