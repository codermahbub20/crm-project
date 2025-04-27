export interface Log {
  _id: string;
  date: string;
  interactionType: string;
  notes: string;
  clientId?: {
    name: string;
  };
  projectId?: {
    title: string;
  };
}

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  id?: string;
}

export interface Project {
  id?: string;
  _id?: string;
  title: string;
  deadline: string;
  budget: number;
  status: string;
}

export interface InteractionForm {
  date: string;
  interactionType: string;
  notes: string;
  clientId?: string;
  projectId?: string;
}
export interface AddProjectForm {
  title: string;
  budget: number;
  deadline: string;
  status: string;
  clientId: string;
}
