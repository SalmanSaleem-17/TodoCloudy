import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task, TaskSchema } from '@/types/task.interface';
import { api } from '@/lib/api';
import { AssignTaskDto } from '@/services/task.service';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: TaskSchema, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { id, taskData }: { id: string; taskData: Partial<TaskSchema> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const assignTask = createAsyncThunk(
  'tasks/assignTask',
  async (
    { taskId, assigneeId }: AssignTaskDto,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/assign`, {
        assigneeId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);