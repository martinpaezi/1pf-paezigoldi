export interface ICourse {
  id: number;
  course: string;
  students: number;
  createdAt: Date;
}

export interface ICreateCoursePayload {
  id: number;
  course: string;
  students: number;
}