import { Routes } from '@angular/router';
import { PlaceholderComponent } from './shared/components/placeholder/placeholder.component';

export const routes: Routes = [
  { path: '', redirectTo: 'leads', pathMatch: 'full' },
  { path: 'dashboard', component: PlaceholderComponent },
  { path: 'automations', component: PlaceholderComponent },
  { path: 'leads', loadChildren: () => import('./features/leads/leads.routes').then(m => m.leadsRoutes) }
];
