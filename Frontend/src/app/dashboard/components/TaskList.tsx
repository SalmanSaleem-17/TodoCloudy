'use client';

import { useGetTasksQuery } from '@/features/tasks/taskThunks';
import TaskStatusBadge from './TaskStatusBadge';
import { TaskStatus } from '@/types/task.interface';
import TaskAssignModal from './TaskAssignModal';
import { useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

export default function TaskList() {
  const { data: tasks, isLoading, isError, refetch } = useGetTasksQuery();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const { socket } = useSocket();

  socket?.on('task_created', () => {
    refetch();
  });

  socket?.on('task_updated', () => {
    refetch();
  });

  socket?.on('task_deleted', () => {
    refetch();
  });

  socket?.on('task_assigned', () => {
    refetch();
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Your Tasks
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {tasks?.map((task) => (
            <li key={task.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-primary-600">
                    {task.title}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <TaskStatusBadge status={task.status as TaskStatus} />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {task.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedTask(task.id)}
                      className="ml-2 rounded bg-primary-600 px-2 py-1 text-xs font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedTask && (
        <TaskAssignModal
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}