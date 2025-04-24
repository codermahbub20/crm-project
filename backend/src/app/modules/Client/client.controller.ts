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
    message: 'Create Client successfully',
    data: result,
  });
});

export const ClientController = { createClient };
