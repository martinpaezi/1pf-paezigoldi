import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICourse } from './models';

const CLASSES_DB: ICourse[] = [
  { id: 1, course: 'Javascript', students: 45 },
  { id: 2, course: 'React', students: 21 },
  { id: 3, course: 'Angular', students: 23 },
  { id: 4, course: 'Vue', students: 11 },
];

@Injectable({ providedIn: 'root' })
export class CoursesService {
  getCoursesByUserId(arg0: any): Observable<ICourse[]> {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  getCourses(): Observable<ICourse[]> {
    return of(CLASSES_DB);
  }

  createCourse(data: ICourse): Observable<ICourse[]> {
    CLASSES_DB.push(data);
    return of(CLASSES_DB);
  }

  deleteCourse(id: number): Observable<ICourse[]> {
    const index = CLASSES_DB.findIndex(course => course.id === id);
    if (index >= 0) {
      CLASSES_DB.splice(index, 1);
    }
    return of(CLASSES_DB);
  }

  updateCourse(id: number, data: ICourse): Observable<ICourse[]> {
    const index = CLASSES_DB.findIndex(course => course.id === id);
    if (index >= 0) {
      CLASSES_DB[index] = { ...CLASSES_DB[index], ...data };
    }
    return of(CLASSES_DB);
  }
}
