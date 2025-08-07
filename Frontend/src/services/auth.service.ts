import api from '@/lib/api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post('/auth/register', {
    name,
    email,
    password,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (data: {
  name?: string;
  password?: string;
}) => {
  const response = await api.patch('/users/profile', data);
  return response.data;
};