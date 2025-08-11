import { RouterModule, Routes } from '@angular/router';
import { HeaderMenu } from '../app/features/header-menu/header-menu';
import { PrincipalHome } from './features/home/principal-home/principal-home';
import { LogsTable } from './features/logs-table/logs-table';
import { Metric } from './features/metrics/metrics';

export const routes: Routes = [
  { path: '', redirectTo: 'Principal', pathMatch: 'full' },
  { path: 'home', component: HeaderMenu },
  { path: 'metrics', component: Metric },
  { path: 'Principal', component: PrincipalHome },
  { path: 'logs', component: LogsTable },
];
