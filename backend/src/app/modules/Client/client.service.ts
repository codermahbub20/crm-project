import { TClient } from './client.interface';
import { Client } from './client.model';

const createClient = async (clientData: TClient) => {
  const result = await Client.create(clientData);
  return result;
};

const getAllClients = async (query: any) => {
  const result = await Client.find();
  return result;
};

export const ClientService = { createClient, getAllClients };
