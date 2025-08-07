'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/utils/validators';
import { useLoginMutation } from '@/features/auth/authApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logged in successfully');
      router.push('/dashboard');
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (error) {
      toast.error(
        'data' in error
          ? (error.data as { message: string }).message
          : 'Login failed'
      );
    }
  }, [error]);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="Email address"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-danger-600">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}