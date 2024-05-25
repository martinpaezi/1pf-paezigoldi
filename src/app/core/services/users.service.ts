import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStudents } from '../../layouts/dashboard/pages/students/models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private MOCK_AUTH_USER: IStudents = {
    id: 1,
    firstName: 'Martin',
    lastName: 'Paez',
    fullName: 'Martin Paez',
    course: 'Angular',
    email: 'martin@mail.com',
    role: 'ADMIN',
    createdAt: new Date(),
  };

  private _authUser$ = new BehaviorSubject<IStudents | null>(null);
  public authUser$: Observable<IStudents | null> = this._authUser$.asObservable();
  
  constructor(private router: Router) {}

  login(email: string, password: string): void {
    if (email !== 'martin@mail.com' || password !== '123456') {
      alert('Correo o password incorrectos');
    } else {
      this.authUser$.forEach(console.log)
      this._authUser$.next(this.MOCK_AUTH_USER);
      localStorage.setItem('accessToken', 'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds');
      this.router.navigate(['dashboard']);
    }
  }

  getAuthenticatedUser(): IStudents {
    return this.MOCK_AUTH_USER;
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authUser$.next(this.MOCK_AUTH_USER);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
