import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { IStudents } from '../../layouts/dashboard/pages/students/models';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería tener un valor inicial de authUser$ como null', () => {
    service.authUser$.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  it('debería establecer authUser$ correctamente después de iniciar sesión', () => {
    const testUser: IStudents = {
      id: 1,
      firstName: 'Martin',
      lastName: 'Paez',
      fullName: '',
      course: 'Angular',
      email: 'martin@mail.com',
      role: 'ADMIN',
      createdAt: new Date()    
    };

    service.login();

    service.authUser$.subscribe(user => {
      expect(user).toEqual(testUser);
    });
  });
});
