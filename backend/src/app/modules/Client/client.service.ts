import { HttpStatus } from 'http-status-ts';

import { TClient, TProject } from './client.interface';
import { Client } from './client.model';
import AppError from '../../Errors/AppError';

const createClient = async (clientData: TClient) => {
  const result = await Client.create(clientData);
  return result;
};

const addProjectToClient = async (clientId: string, projectData: TProject) => {
  const client = await Client.findById(clientId);
  if (!client) {
    throw new AppError(HttpStatus.NOT_FOUND, 'No client found');
  }
  client.projects?.push(projectData);
  await client.save();
  return client;
};

export const ClientService = { createClient, addProjectToClient };
