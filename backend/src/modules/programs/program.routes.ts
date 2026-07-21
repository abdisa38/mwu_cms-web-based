import { Router } from 'express';
import { ProgramController } from './program.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const programController = new ProgramController();

router.use(authenticate);

router.route('/')
  .get(programController.getAll)
  .post(programController.create);

router.route('/:id')
  .get(programController.getById)
  .put(programController.update)
  .delete(programController.delete);

export default router;
