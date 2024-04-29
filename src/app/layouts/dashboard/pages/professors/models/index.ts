export type Role = 'ADMIN' | 'ESTUDIANTE' | 'PROFESOR';

export interface IProfessors {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  course: string;
  email: string;
  role: Role;
  createdAt: Date;
}