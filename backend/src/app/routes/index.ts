import { Router } from 'express';

import { userRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/admin',
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
