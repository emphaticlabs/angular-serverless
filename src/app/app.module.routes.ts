import { Routes } from '@angular/router';
import {TablaPosComponent} from './tabla-pos/tabla-pos.component';

export const appModuleRoutes: Routes = [
  { path: 'inicio', component: TablaPosComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' }
];
