import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';

import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component'; 
import { SharedModule } from '../../../../shared/shared.module';
// import { FullNamePipe } from './full-name.pipe';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDialogComponent,
    // FullNamePipe
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    // FullNamePipe
  ],
  exports: [
    StudentsComponent,
  ]
})
export class StudentsModule {

 }
