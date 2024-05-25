import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IStudents } from '../dashboard/pages/students/models';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let userService: UsersService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [UsersService]
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('debería establecer authUser$ correctamente', () => {
    const testUser: IStudents = {
      id: 1,
      firstName: 'Nombre',
      lastName: 'Apellido',
      fullName: 'Nombre Apellido',
      course: '',
      email: '',
      role: 'ADMIN',
      createdAt: new Date(),
    };
    const userServiceAuthUser$ = new BehaviorSubject<IStudents | null>(testUser);
    
    component.authUser$ = userServiceAuthUser$;

    expect(component.authUser$).toBe(userServiceAuthUser$);
  });

  it('debería llamar a login() y navegar a "/dashboard"', () => {
    spyOn(userService, 'login');
    spyOn(router, 'navigate');

    component.login();

    expect(userService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('debería llamar a ngOnDestroy() y desuscribirse correctamente', () => {
    spyOn(component['unsubscribe$'], 'next');
    spyOn(component['unsubscribe$'], 'complete');
    spyOn(router, 'navigate');

    component.ngOnDestroy();

    expect(component['unsubscribe$'].next).toHaveBeenCalled();
    expect(component['unsubscribe$'].complete).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});