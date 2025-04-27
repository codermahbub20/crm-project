import express from 'express';
import { LogsController } from './logs.controller';

const router = express.Router();

router.post('/logs', LogsController.addLogs);
// router.get('/projects', ProjectController.getAllProjects);
router.get('/logs', LogsController.getAllLogs);

export const logsRoutes = router;
