import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { PronosticoComponent } from './pronostico/pronostico.component';
import { PronosticosService } from '../share/pronosticos.service';
import { PronosticosListComponent } from '../pronosticos-list/pronosticos-list.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MaterialComponentsModule,
    ShareModule
  ],
  declarations: [TeamDetailComponent, PronosticoComponent]
})
export class TeamsModule {}
