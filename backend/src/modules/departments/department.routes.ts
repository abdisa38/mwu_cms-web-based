import { Router } from 'express';
import { DepartmentController } from './department.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const departmentController = new DepartmentController();

router.use(authenticate);

router.route('/')
  .get(departmentController.getAll)
  .post(departmentController.create);

router.route('/:id')
  .get(departmentController.getById)
  .put(departmentController.update)
  .delete(departmentController.delete);

export default router;
