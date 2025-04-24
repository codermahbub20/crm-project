import { HttpStatus } from 'http-status-ts';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { ClientService } from './client.service';

const createClient = CatchAsync(async (req: Request, res: Response) => {
  const result = await ClientService.createClient(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Client Created successfully',
    data: result,
  });
});

const addProjectToClient = CatchAsync(async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const project = req.body;
  const result = await ClientService.addProjectToClient(clientId, project);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Client Project add successfully',
    data: result,
  });
});

export const ClientController = { createClient, addProjectToClient };
