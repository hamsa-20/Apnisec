export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  email: string;
  password: string;
  name?: string;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
}