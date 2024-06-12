import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateStudentPayload, IStudents } from './models';
import { environment } from '../../../../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<IStudents[]> {
    return this.httpClient.get<IStudents[]>(environment.baseAPIURL +`/students`);
  }

  createStudent(payload: ICreateStudentPayload): Observable<IStudents> {
    return this.httpClient.post<IStudents>(environment.baseAPIURL +`/students`, payload);
  }

  updateStudent(id: number, payload: IStudents): Observable<IStudents> {
    return this.httpClient.put<IStudents>(environment.baseAPIURL +'/students/'+ id, payload);
  }

  deleteStudentById(id: string): Observable<IStudents> {
    return this.httpClient.delete<IStudents>(environment.baseAPIURL +'/students/'+ id);
  }
}