export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  ARCHIVED = 'archived',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignee?: {
    id: string;
    name: string;
    email: string;
  };
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}