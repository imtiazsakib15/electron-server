import { Router } from 'express';
import { userController } from './user.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import { UpdateUserSchema } from './user.schema';

const router = Router();

router.get('/', auth(USER_ROLE.ADMIN), userController.getAll);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(UpdateUserSchema),
  userController.updateById,
);

router.delete('/:id', auth(USER_ROLE.ADMIN), userController.deleteById);

export const userRoutes = router;
