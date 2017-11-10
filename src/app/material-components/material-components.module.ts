import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatProgressBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule
  ],
  exports: [
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialComponentsModule {}
