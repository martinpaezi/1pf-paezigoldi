import { Injectable } from '@angular/core';
import { ICreateCoursePayload, ICourse } from './models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(
      environment.baseAPIURL + '/courses'
    );
  }

  createCourse(payload: ICreateCoursePayload): Observable<ICourse> {
    return this.httpClient.post<ICourse>(
      environment.baseAPIURL + '/courses',
      payload
    );
  }

  updateCourse(id: number, payload: ICourse): Observable<ICourse> {
     return this.httpClient.put<ICourse>(environment.baseAPIURL +'/courses/'+ id, payload);
   }

  deleteCourseById(id: number): Observable<ICourse> {
    return this.httpClient.delete<ICourse>(
      environment.baseAPIURL + '/courses/' + id
    );
  }
}