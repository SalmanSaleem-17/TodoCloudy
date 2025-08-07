import { redirect } from 'next/navigation';
import { getServerSession } from '../protected/getServerSession';
import ProfileCard from './components/ProfileCard';

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}