import { Router } from 'express';
import { StaffController } from './staff.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const staffController = new StaffController();

router.use(authenticate);

router.route('/')
  .get(staffController.getAll)
  .post(staffController.create);

router.route('/:id')
  .get(staffController.getById)
  .put(staffController.update)
  .delete(staffController.delete);

router.route('/:id/restore')
  .patch(staffController.restore);

export default router;
