import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IStudents } from "../../layouts/dashboard/pages/students/models";

@Injectable({ providedIn: 'root'})
export class UsersService {

  private _authUser$ = new BehaviorSubject<IStudents | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor() {}

  login(): void {
    this._authUser$.next({
      id: 1,
      firstName: 'Martin',
      lastName: 'Paez',
      fullName: '',
      course: 'Angular',
      email: 'martin@mail.com',
      role: 'ADMIN',
      createdAt: new Date()    
    });
  }

}
