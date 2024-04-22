import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IStudents } from "../../layouts/dashboard/pages/students/models";

@Injectable({ providedIn: 'root'})
export class UsersService {

  authUser$ = new BehaviorSubject<IStudents | null>(null);

  private mockUsers: IStudents[] = [
    { id: 1, firstName: 'Martín', lastName: 'Páez', email: 'martin@mail.com', fullName: '', course: 'Programación', role: 'ESTUDIANTE', createdAt: new Date() },
    { id: 2, firstName: 'Andrés', lastName: 'Igoldi', email: 'andres@mail.com', fullName: '', course: 'Marketing', role: 'ESTUDIANTE', createdAt: new Date() },
    { id: 3, firstName: 'Juan', lastName: 'Espinola', email: 'juan@mail.com', fullName: '', course: 'Diseño', role: 'ESTUDIANTE', createdAt: new Date() },
    { id: 4, firstName: 'Sebastian', lastName: 'Pinola', email: 'seba@mail.com', fullName: '', course: 'Fotografía', role: 'ESTUDIANTE', createdAt: new Date() }
  ];

  constructor() {}

  login(): void {
    this.authUser$.next({
      id: 1,
      firstName: 'Martin',
      lastName: 'Paez',
      fullName: '',
      course: 'Angular',
      email: 'martin@mail.com',
      role: 'ADMIN',
      createdAt: new Date()    
    })
  }

  getAllUsers(): Promise<IStudents[]> {
    return Promise.resolve(this.mockUsers);
  }
}
