import express from 'express';
import { ClientController } from './client.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/clients', ClientController.createClient);

export const clientRoutes = router;
