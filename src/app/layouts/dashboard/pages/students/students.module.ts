import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component'; 
import { SharedModule } from '../../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StudentsEffects } from './store/student.effects';
import { studentFeature } from './store/student.reducer';
import { AuthModule } from '../../../auth/auth.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDialogComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([StudentsEffects]),
    StoreModule.forFeature(studentFeature),
    AuthModule,
    MatProgressSpinnerModule
  ],
  exports: [
    StudentsComponent,
  ]
})
export class StudentsModule { }