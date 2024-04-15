import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

  import {MatSidenavModule} from '@angular/material/sidenav'; 
  import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';

// import { FullNamePipe } from './pages/pipes/full-name.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    // FullNamePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StudentsModule,
    SharedModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {
     showFiller = false;
 }