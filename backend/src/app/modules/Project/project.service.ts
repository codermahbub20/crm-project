import { Project } from './project.model';
import { TProject } from './project.interface';
import { Client } from '../Client/client.model';
import AppError from '../../Errors/AppError';
import { HttpStatus } from 'http-status-ts';

const addProjectToClient = async (projectData: TProject) => {
  const client = await Client.findById(projectData.clientId);
  if (!client) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Client not found');
  }
  const project = await Project.create(projectData);
  return project;
};

const getAllProjects = async () => {
  const projects = await Project.find().populate('clientId');
  return projects;
};

export const ProjectService = { addProjectToClient, getAllProjects };
