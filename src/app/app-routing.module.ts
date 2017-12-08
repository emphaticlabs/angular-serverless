import { RouterModule, Routes } from '@angular/router';
import { TablaPosComponent } from './tabla-pos/tabla-pos.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PronosticosListComponent } from './pronosticos-list/pronosticos-list.component';

const appModuleRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: TablaPosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'pronosticos', component: PronosticosListComponent },
  { path: 'equipo/:id', loadChildren: './teams/teams.module#TeamsModule' },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(appModuleRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
