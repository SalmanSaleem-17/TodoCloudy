// features/user/userTypes.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserState {
  currentUser: User | null;
}