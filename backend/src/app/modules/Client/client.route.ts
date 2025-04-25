import express from 'express';
import { ClientController } from './client.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/clients', ClientController.createClient);
router.get('/clients', ClientController.getAllClients);

export const clientRoutes = router;
