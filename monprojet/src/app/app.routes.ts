import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'cours',
    loadComponent: () => import('./cours/cours.page').then( m => m.CoursPage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // add topics route with a parameters id
  {
    path: 'topics/:courseId',
    loadComponent: () => import('./topics/topics.page').then( m => m.TopicsPage)
  }
];
