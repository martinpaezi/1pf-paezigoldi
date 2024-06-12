import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { IUserss } from '../../layouts/dashboard/pages/userss/models';

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
    const testUser: IUserss = {
      id: 1,
      firstName: 'Martin',
      lastName: 'Paez',
      fullName: '',
      email: 'martin@mail.com',
      password: '',
      role: 'ADMIN',
      createdAt: new Date()    
    };

    // service.login();

    service.authUser$.subscribe(user => {
      expect(user).toEqual(testUser);
    });
  });
});
