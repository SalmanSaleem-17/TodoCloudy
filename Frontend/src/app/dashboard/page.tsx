import { redirect } from 'next/navigation';
import { getServerSession } from '../protected/getServerSession';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TaskList />
          </div>
          <div className="lg:col-span-1">
            <TaskForm />
          </div>
        </div>
      </div>
    </div>
  );
}