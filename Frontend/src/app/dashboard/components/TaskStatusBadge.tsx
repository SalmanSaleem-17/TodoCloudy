import { TaskStatus } from '@/types/task.interface';
import { classNames } from '@/utils/helpers';

const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'bg-gray-100 text-gray-800',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TaskStatus.DONE]: 'bg-green-100 text-green-800',
  [TaskStatus.ARCHIVED]: 'bg-purple-100 text-purple-800',
};

const statusLabels: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.DONE]: 'Done',
  [TaskStatus.ARCHIVED]: 'Archived',
};

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusColors[status]
      )}
    >
      {statusLabels[status]}
    </span>
  );
}