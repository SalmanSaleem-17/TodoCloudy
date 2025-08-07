import api  from '@/lib/api';

export interface AssignTaskDto {
  taskId: string;
  assigneeId: string;
}

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (data: { title: string; description?: string }) => {
  const response = await api.post('/tasks', data);
  return response.data;
};

export const updateTask = async (
  id: string,
  data: { title?: string; description?: string; status?: string }
) => {
  const response = await api.patch(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const assignTask = async ({ taskId, assigneeId }: AssignTaskDto) => {
  const response = await api.patch(`/tasks/${taskId}/assign`, { assigneeId });
  return response.data;
};