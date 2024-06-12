export type Role = 'ADMIN' | 'USER';

export interface IUserss {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface ICreateUserPayload {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
}