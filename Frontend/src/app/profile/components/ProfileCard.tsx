'use client';

import { useGetProfileQuery, useUpdateProfileMutation } from '@/features/user/userThunks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileSchema } from '@/utils/validators';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function ProfileCard() {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading, isSuccess, error }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileSchema) => {
    updateProfile(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(
        'data' in error
          ? (error.data as { message: string }).message
          : 'Failed to update profile'
      );
    }
  }, [error]);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Profile Information
        </h3>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-danger-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                {...register('email')}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password (leave blank to keep current)
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-danger-600">
                  {errors.password.message}
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
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}