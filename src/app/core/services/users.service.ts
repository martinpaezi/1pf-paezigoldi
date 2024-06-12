import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUserss } from '../../layouts/dashboard/pages/userss/models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'http://localhost:3000';

  private _authUser$ = new BehaviorSubject<IUserss | null>(null);
  public authUser$: Observable<IUserss | null> = this._authUser$.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string): Observable<IUserss | null> {
    return this.http.get<IUserss[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this._authUser$.next(user);
          localStorage.setItem('accessToken', 'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds');
          return user;
        } else {
          alert('Correo o password incorrectos');
          return null;
        }
      })
    );
  }

  getAuthenticatedUser(): IUserss | null {
    return this._authUser$.value;
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const user = this._authUser$.value;
      if (user) {
        return true;
      }
    }
    return false;
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
