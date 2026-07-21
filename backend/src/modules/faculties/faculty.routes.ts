import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import { authenticate } from '../../middlewares/auth.middleware';
// import { restrictTo } from '../../middlewares/rbac.middleware'; // To be added later

const router = Router();
const facultyController = new FacultyController();

router.use(authenticate); // Secure all faculty routes

router.route('/')
  .get(facultyController.getAll)
  .post(facultyController.create); // e.g. restrictTo('REGISTRAR', 'SUPER_ADMIN')

router.route('/:id')
  .get(facultyController.getById)
  .put(facultyController.update)
  .delete(facultyController.delete);

export default router;
