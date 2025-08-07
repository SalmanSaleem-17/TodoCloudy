import LoginForm from './components/LoginForm';
import { redirect } from 'next/navigation';
import { getServerSession } from '../protected/getServerSession';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) redirect('/dashboard');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}