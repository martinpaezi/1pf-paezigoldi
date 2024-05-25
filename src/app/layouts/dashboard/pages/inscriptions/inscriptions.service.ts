import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Inscription } from './models';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {
  private apiUrl = `${environment.baseAPIURL}/inscriptions`;
  private coursesUrl = `${environment.baseAPIURL}/courses`;
  private studentsUrl = `${environment.baseAPIURL}/students`;
  error$: Observable<any>;
  loading$: Observable<boolean>;
  inscriptions$: Observable<Inscription[]>;

  constructor(private http: HttpClient) {
    this.error$ = of(null); 
    this.loading$ = timer(2000).pipe(
      switchMap(() => of(false)) 
    );
    this.inscriptions$ = this.loading$.pipe(
      switchMap(loading => {
        if (loading) {
          return of([]); 
        } else {
          return this.http.get<Inscription[]>(this.apiUrl).pipe(
            switchMap(inscriptions => {
              return this.http.get<any[]>(this.coursesUrl).pipe(
                switchMap(courses => {
                  return this.http.get<any[]>(this.studentsUrl).pipe(
                    map(students => {
                      return inscriptions.map(inscription => {
                        const course = courses.find(course => course.id === inscription.courseId);
                        const student = students.find(student => student.id === inscription.studentId);
                        return {
                          ...inscription,
                          course: course ? course.name : 'Curso Desconocido',
                          studentName: student ? `${student.firstName} ${student.lastName}` : 'Estudiante Desconocido'
                        };
                      });
                    })
                  );
                })
              );
            })
          );
        }
      })
    );
  }

  getInscriptions(): Observable<Inscription[]> {
    return this.inscriptions$;
  }
}
