import express from 'express';
import { ProjectController } from './project.controller';

const router = express.Router();

router.post('/projects', ProjectController.addProjectToClient);
router.get('/projects', ProjectController.getAllProjects);
router.patch('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProjectById);

export const projectRoutes = router;
