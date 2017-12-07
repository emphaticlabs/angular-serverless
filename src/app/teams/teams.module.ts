import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import {MaterialComponentsModule} from '../material-components/material-components.module';
import { PronosticoComponent } from './pronostico/pronostico.component';
import { PronosticosService } from './pronosticos.service';
import { PronosticosListComponent } from './pronosticos-list/pronosticos-list.component';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MaterialComponentsModule
  ],
  declarations: [TeamDetailComponent, PronosticoComponent, PronosticosListComponent],
  providers: [PronosticosService]
})
export class TeamsModule { }
