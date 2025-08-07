'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice';
import userReducer from '../features/user/userSlice';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from '../socket/socket';
import { authApi } from '../features/auth/authApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>{children}</SocketProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
