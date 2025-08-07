'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '@/utils/validators';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks'; // make sure this exists
import { register as registerThunk } from '@/features/auth/authThunks';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);
    try {
      await dispatch(registerThunk(data)).unwrap();
      toast.success('Account created successfully');
      router.push('/login');
    } catch (err: any) {
      toast.error(err?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="Full name"
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-danger-600">{errors.name.message}</p>
          )}
        </div>

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
            autoComplete="new-password"
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

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );
}
