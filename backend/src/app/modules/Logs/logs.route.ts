import express from 'express';
import { LogsController } from './logs.controller';

const router = express.Router();

router.post('/logs', LogsController.addLogs);
// router.get('/projects', ProjectController.getAllProjects);

export const logsRoutes = router;
