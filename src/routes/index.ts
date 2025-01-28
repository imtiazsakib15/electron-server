import { Router } from 'express';
import { IModuleRoute } from '../interfaces/route';
import { authRoutes } from '../modules/auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { productRoutes } from '../modules/product/product.route';
import { categoryRoutes } from '../modules/category/category.route';

const router = Router();

const moduleRoutes: IModuleRoute[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
];

moduleRoutes.forEach((route: IModuleRoute) =>
  router.use(route.path, route.route),
);

export default router;
