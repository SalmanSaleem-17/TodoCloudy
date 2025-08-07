export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const storeToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    document.cookie = `token=${token}; path=/;`;
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};