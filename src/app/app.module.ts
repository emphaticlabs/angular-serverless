import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { AppRoutingModule } from './app-routing.module';
import { TablaPosComponent } from './tabla-pos/tabla-pos.component';
import { LigaService } from './tabla.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LaLigaAuthInterceptor } from './interceptors/auth.interceptors';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { PronosticosGuard } from './guards/pronosticos-guard';

@NgModule({
  declarations: [
    AppComponent,
    TablaPosComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  providers: [
    LigaService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LaLigaAuthInterceptor,
      multi: true
    },
    PronosticosGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
