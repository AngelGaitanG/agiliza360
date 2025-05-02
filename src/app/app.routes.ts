import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'welcome',
    loadComponent: () => import('./features/auth/pages/welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'brand',
    loadChildren: () => import('./features/brand/brand.routes').then(m => m.BRAND_ROUTES)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
