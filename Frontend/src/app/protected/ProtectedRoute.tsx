'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types/index.d';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }

    if (
      !isLoading &&
      user &&
      allowedRoles &&
      !allowedRoles.includes(user.role)
    ) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router, allowedRoles]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div>Unauthorized</div>;
  }

  return <>{children}</>;
}