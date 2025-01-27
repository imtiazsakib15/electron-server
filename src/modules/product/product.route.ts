import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { CreateProductSchema, UpdateProductSchema } from './product.schema';
import { productController } from './product.controller';

const router = Router();

router.post(
  '/create',
  validateRequest(CreateProductSchema),
  productController.create,
);

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.put(
  '/:id',
  validateRequest(UpdateProductSchema),
  productController.updateById,
);

router.delete('/:id', productController.deleteById);

export const productRoutes = router;
