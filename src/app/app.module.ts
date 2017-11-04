import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { appModuleRoutes } from './app.module.routes';
import { TablaPosComponent } from './tabla-pos/tabla-pos.component';
import { TableService } from './tabla.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LaLigaAuthInterceptor } from './interceptors/auth.interceptors';

@NgModule({
  declarations: [AppComponent, TablaPosComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appModuleRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FlexLayoutModule
  ],
  providers: [
    TableService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LaLigaAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
