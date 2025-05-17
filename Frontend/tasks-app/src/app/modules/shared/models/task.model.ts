export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateTask {
  title: string;
  description: string;
}

export interface UpdateTask {
  title: string;
  description: string;
  isCompleted: boolean;
}