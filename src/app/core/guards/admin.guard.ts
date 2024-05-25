import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  return usersService.authUser$.pipe(
    map((authUser) =>
      authUser?.role !== 'ADMIN'
        ? router.createUrlTree(['dashboard'])
        : true
    )
  );
};
