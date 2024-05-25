export type Role = 'ADMIN' | 'ESTUDIANTE' | 'USER';

export interface IStudents {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  course: string;
  email: string;
  role: Role;
  createdAt: Date;
}
