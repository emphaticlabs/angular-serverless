import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PronosticosService } from './pronosticos.service';

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule,
      providers: [PronosticosService]
    };
  }
}
