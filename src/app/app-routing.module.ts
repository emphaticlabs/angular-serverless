import { RouterModule, Routes } from '@angular/router';
import { TablaPosComponent } from './tabla-pos/tabla-pos.component';
import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const appModuleRoutes: Routes = [
  { path: 'inicio', component: TablaPosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'equipo/:id', loadChildren: './teams/teams.module#TeamsModule' },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(appModuleRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
