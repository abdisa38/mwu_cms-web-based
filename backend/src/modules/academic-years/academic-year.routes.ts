import { Router } from 'express';
import { AcademicYearController } from './academic-year.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const academicYearController = new AcademicYearController();

router.use(authenticate);

router.route('/')
  .get(academicYearController.getAll)
  .post(academicYearController.create);

router.route('/:id')
  .get(academicYearController.getById)
  .put(academicYearController.update);

export default router;
