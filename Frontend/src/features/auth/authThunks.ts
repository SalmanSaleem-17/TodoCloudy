import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginSchema, RegisterSchema } from '@/utils/validators';
import  api  from '@/lib/api';
import { setCredentials, logout } from './authSlice';
import { storeToken, removeToken } from '@/utils/token';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginSchema, { dispatch }) => {
    const response = await api.post('/auth/login', credentials);
    const { access_token: token } = response.data;
    const user = { ...response.data.user };
    storeToken(token);
    dispatch(setCredentials({ user, token }));
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterSchema) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    removeToken();
    dispatch(logout());
  }
);