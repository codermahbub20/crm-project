import { HttpStatus } from 'http-status-ts';
import sendResponse from '../../utils/sendResponse';
import { LogsService } from './logs.service';
import { Request, Response } from 'express';

const addLogs = async (req: Request, res: Response) => {
  const result = await LogsService.addLogs(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Logs add successfully',
    data: result,
  });
};

export const LogsController = { addLogs };
