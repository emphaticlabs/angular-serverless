import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  declarations: []
})
export class MaterialComponentsModule {}
