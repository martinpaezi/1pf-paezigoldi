import { Injectable } from "@angular/core";
import { IProfessors } from "./models";
import { Observable, delay, of } from "rxjs";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment.development";

const PROFESSORS_DB: IProfessors[] = [

  // {
  //   id: 1,
  //   firstName: 'Martin',
  //   lastName: 'Paez',
  //   fullName: '',
  //   course: 'Angular',
  //   email: 'martin@mail.com',
  //   role: 'ADMIN',
  //   createdAt: new Date()
  // },
  // {
  //   id: 2,
  //   firstName: 'Andres',
  //   lastName: 'Igoldi',
  //   fullName: '',
  //   email: 'andres@mail.com',
  //   course: 'Marketing',
  //   role: 'PROFESOR',
  //   createdAt: new Date()
  // }
]

@Injectable({ providedIn: 'root'})
export class ProfessorsService {

  constructor(private httpClient: HttpClient) {}

  getProfessors(): Observable<IProfessors[]> {
    return this.httpClient.get<IProfessors[]>(environment.baseAPIURL + '/users')
  }

  // getProfessors(): Observable<IProfessors[]> {
  //   return of(PROFESSORS_DB).pipe(delay(1500));
  // }
}