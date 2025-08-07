'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskSchema } from '@/utils/validators';
import { useCreateTaskMutation } from '@/features/tasks/taskThunks';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function TaskForm() {
  const [createTask, { isLoading, isSuccess, error }] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskSchema) => {
    createTask(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Task created successfully');
      reset();
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (error) {
      toast.error(
        'data' in error
          ? (error.data as { message: string }).message
          : 'Failed to create task'
      );
    }
  }, [error]);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create New Task
        </h3>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                {...register('title')}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-danger-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                {...register('description')}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-danger-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {isLoading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}