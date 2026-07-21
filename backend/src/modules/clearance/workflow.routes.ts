import { Router } from 'express';
import { WorkflowController } from './workflow.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const workflowController = new WorkflowController();

router.use(authenticate);

router.get('/:id', workflowController.getById);

// Staff approving their department
router.patch('/:id/department-approve', workflowController.processDepartmentApproval);

// Registrar doing final overarching approval
router.patch('/:id/final-approve', workflowController.processRegistrarFinal);

export default router;
