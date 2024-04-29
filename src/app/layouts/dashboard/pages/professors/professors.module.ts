import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorsRoutingModule } from './professors-routing.module';
import { ProfessorsComponent } from './professors.component';
import { ProfessorsDialogComponent } from './components/professors-dialog/professors-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 


@NgModule({
  declarations: [
    ProfessorsComponent,
    ProfessorsDialogComponent
  ],
  imports: [
    CommonModule,
    ProfessorsRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
  ]
})
export class ProfessorsModule { }
