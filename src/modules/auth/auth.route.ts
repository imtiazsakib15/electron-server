import { Router } from 'express';
import { authController } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { CreateUserSchema } from '../user/user.schema';

const router = Router();

router.post(
  '/register',
  validateRequest(CreateUserSchema),
  authController.register,
);

router.post('/login', authController.login);

export const authRoutes = router;
