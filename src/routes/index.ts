import { Router } from 'express';
import { IModuleRoute } from '../interfaces/route';

const router = Router();

const moduleRoutes: IModuleRoute[] = [];

moduleRoutes.forEach((route: IModuleRoute) =>
  router.use(route.path, route.route),
);

export default router;
