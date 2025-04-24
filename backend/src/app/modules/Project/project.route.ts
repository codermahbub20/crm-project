import express from 'express';
import { ProjectController } from './project.controller';

const router = express.Router();

router.post('/projects', ProjectController.addProjectToClient);
router.get('/projects', ProjectController.getAllProjects);

export const projectRoutes = router;
