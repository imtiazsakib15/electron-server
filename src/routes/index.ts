import { Router } from 'express';
import { IModuleRoute } from '../interfaces/route';
import { authRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes: IModuleRoute[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route: IModuleRoute) =>
  router.use(route.path, route.route),
);

export default router;
