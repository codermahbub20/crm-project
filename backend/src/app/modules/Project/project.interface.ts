export interface TProject {
  title: string;
  budget: number;
  deadline: Date;
  status: 'Ongoing' | 'Completed' | 'Pending';
  clientId: string;
}
