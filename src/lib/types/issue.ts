export interface Issue {
  id: string;
  type: string;
  title: string;
  description: string;
  priority?: string;
  status?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IssueCreateInput {
  type: string;
  title: string;
  description: string;
  priority?: string;
  status?: string;
  userId: string;
}

export interface IssueUpdateInput {
  type?: string;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
}