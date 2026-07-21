import { Router } from 'express';
import { StudentController } from './student.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const studentController = new StudentController();

router.use(authenticate);

router.route('/')
  .get(studentController.getAll)
  .post(studentController.create);

router.route('/:id')
  .get(studentController.getById)
  .put(studentController.update)
  .delete(studentController.delete);

router.route('/:id/restore')
  .patch(studentController.restore);

export default router;
