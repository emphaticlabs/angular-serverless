import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import {PronosticoComponent} from './pronostico/pronostico.component';

const routes: Routes = [
  { path: '', component: TeamDetailComponent },
  { path: 'quiniela/:id', component: PronosticoComponent },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {}
