import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
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
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [],
  providers: []
})
export class MaterialComponentsModule {}
