import { Router } from 'express';

export interface IModuleRoute {
  path: string;
  route: Router;
}
