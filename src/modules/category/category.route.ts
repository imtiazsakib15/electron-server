import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { CreateCategorySchema, UpdateCategorySchema } from './category.schema';
import { categoryController } from './category.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

router.post(
  '/create',
  auth(USER_ROLE.ADMIN),
  validateRequest(CreateCategorySchema),
  categoryController.create,
);

router.get('/', categoryController.getAll);

router.get('/:id', categoryController.getById);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(UpdateCategorySchema),
  categoryController.updateById,
);

router.delete('/:id', auth(USER_ROLE.ADMIN), categoryController.deleteById);

export const categoryRoutes = router;
