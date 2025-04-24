import { TClient } from './client.interface';
import { Client } from './client.model';

const createClient = async (clientData: TClient) => {
  const result = await Client.create(clientData);
  return result;
};

export const ClientService = { createClient };
