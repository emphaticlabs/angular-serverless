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

@NgModule({
  declarations: [AppComponent, TablaPosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentsModule
  ],
  providers: [
    LigaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LaLigaAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
