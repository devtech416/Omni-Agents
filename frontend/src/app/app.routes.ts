import { Routes } from '@angular/router';
import { PlaceholderComponent } from './shared/components/placeholder/placeholder.component';

export const routes: Routes = [
  { path: '', redirectTo: 'content-studio', pathMatch: 'full' },
  { path: 'dashboard', component: PlaceholderComponent },
  { path: 'automations', component: PlaceholderComponent },
  { path: 'content-studio', loadComponent: () => import('./features/content-studio/content-studio.component').then(m => m.ContentStudioComponent) },
  { path: 'leads', loadChildren: () => import('./features/leads/leads.routes').then(m => m.leadsRoutes) }
];
