export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashedpassword',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'todo',
  assignee: null,
  createdBy: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockJwtPayload = {
  sub: '1',
  email: 'test@example.com',
  role: 'user',
};