import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudents } from './models';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  createUser(result: any) {
    throw new Error('Method not implemented.');
  }
  getUsers() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = environment.baseAPIURL;

  constructor(private http: HttpClient) { }

  getStudents(): Observable<IStudents[]> {
    return this.http.get<IStudents[]>(`${this.apiUrl}/students`);
  }

  getStudentById(id: number): Observable<IStudents> {
    return this.http.get<IStudents>(`${this.apiUrl}/students/${id}`);
  }

  createStudent(student: IStudents): Observable<IStudents> {
    return this.http.post<IStudents>(`${this.apiUrl}/students`, student);
  }

  updateStudent(student: IStudents): Observable<IStudents> {
    return this.http.put<IStudents>(`${this.apiUrl}/students/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${id}`);
  }
}
