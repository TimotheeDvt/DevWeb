import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { Auth } from './services/auth';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.is_authenticated) {
    return true;
  } else {
    // Redirection si non authentifié
    return router.parseUrl('/login');
  }
};