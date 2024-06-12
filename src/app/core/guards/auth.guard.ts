import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const usersService = inject(UsersService);

  return usersService.authUser$.pipe(
    map((authUser) => {
      if (!authUser) {
        return router.createUrlTree(['login']);
      } else {
        return true;
      }
    })
  );
};
