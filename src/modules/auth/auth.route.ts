import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

router.post('/register', authController.register);

export const authRoutes = router;
