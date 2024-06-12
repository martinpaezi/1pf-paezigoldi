export type Role ='ESTUDIANTE' | 'PROFESOR';

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

export interface ICreateStudentPayload {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  course: string;
  email: string;
  role: Role;
}