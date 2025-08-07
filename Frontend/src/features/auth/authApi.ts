// src/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<any, RegisterCredentials>({
      query: ({ email, password, confirmPassword }) => {
        // Client-side check: match passwords
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        return {
          url: '/auth/register',
          method: 'POST',
          body: { email, password },
        };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
