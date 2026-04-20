import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Cours } from './cours/cours';
import { Courses } from './courses/courses';
import { Topics } from './topics/topics';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  // Route parente sans composant pour protéger les enfants
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'courses',
        component: Courses,
      },
      {
        path: 'cours/:id',
        component: Cours,
      },
      {
        path: 'topic/:id',
        component: Topics,
      },
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];