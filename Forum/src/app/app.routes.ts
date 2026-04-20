import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Cours } from './cours/cours';
import { Courses } from './courses/courses';
import { MonComp } from './mon-comp/mon-comp';
import { Topics } from './topics/topics';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'courses',
        component: Courses,
    },
    {
        path: 'cours/:id',
        component: Cours,
    },
    {
        path: 'mon-comp/:id',
        component: MonComp,
    },
    {
        path: 'topic/:id',
        component: Topics,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    }
];
