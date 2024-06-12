import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CoursesRoutingModule } from './courses-routing.module';
import { courseFeature } from './store/course.reducer';
import { CoursesEffects } from './store/course.effects';
import { SharedModule } from '../../../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    StoreModule.forFeature(courseFeature),
    EffectsModule.forFeature([CoursesEffects]),
    MatTableModule,
    MatButtonModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class CoursesModule { }
