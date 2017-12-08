import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { PronosticoComponent } from './pronostico/pronostico.component';
import { PronosticosGuard } from '../guards/pronosticos-guard';
import {PronosticosListComponent} from '../pronosticos-list/pronosticos-list.component';

const routes: Routes = [
  { path: '', component: TeamDetailComponent },
  {
    path: 'quiniela/:id',
    component: PronosticoComponent,
    canActivate: [PronosticosGuard]
  },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
