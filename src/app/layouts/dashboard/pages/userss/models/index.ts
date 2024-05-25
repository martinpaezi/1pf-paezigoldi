export type Role = 'ADMIN' | 'ESTUDIANTE' | 'PROFESOR';

export interface IUserss {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  course: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface CreateUserPayload {
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  course: string | null;
  email: string | null;
  role: Role | null;
}