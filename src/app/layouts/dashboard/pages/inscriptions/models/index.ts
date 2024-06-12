export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  course: string[];
  email: string;
  role: string;
  createdAt: string;
}

export interface ICourse {
  id: string;
  course: string;
  students: string;
  createdAt: string;
}

export interface IInscription {
  id: number;
  courseId: string;
  studentId: string;
  course?: ICourse;
  student?: IStudent;
  date: string;
}

export interface ICreateInscriptionPayload {
  courseId: string;
  studentId: string;
  date: string;
}
