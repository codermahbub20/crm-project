import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { HttpStatus } from 'http-status-ts';
import sendResponse from '../../utils/sendResponse';

const addProjectToClient = async (req: Request, res: Response) => {
  const result = await ProjectService.addProjectToClient(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Client Project add successfully',
    data: result,
  });
};

const getAllProjects = async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ProjectService.getAllProjects(query);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: ' Project retraived successfully',
    data: result,
  });
};

export const ProjectController = { addProjectToClient, getAllProjects };
