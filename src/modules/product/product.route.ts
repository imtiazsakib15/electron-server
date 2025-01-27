import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ProductSchema } from './product.schema';
import { productController } from './product.controller';

const router = Router();

router.post(
  '/create',
  validateRequest(ProductSchema),
  productController.create,
);

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

export const productRoutes = router;
