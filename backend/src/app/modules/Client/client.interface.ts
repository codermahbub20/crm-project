export interface TProject {
  title: string;
  budget: number;
  deadline: Date;
  status: 'Ongoing' | 'Completed' | 'Pending';
}

export interface TClient {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  projects?: TProject[];
}
