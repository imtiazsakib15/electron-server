import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { CreateProductSchema, UpdateProductSchema } from './product.schema';
import { productController } from './product.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = Router();

router.post(
  '/create',
  auth(USER_ROLE.ADMIN),
  validateRequest(CreateProductSchema),
  productController.create,
);

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(UpdateProductSchema),
  productController.updateById,
);

router.delete('/:id', auth(USER_ROLE.ADMIN), productController.deleteById);

export const productRoutes = router;
