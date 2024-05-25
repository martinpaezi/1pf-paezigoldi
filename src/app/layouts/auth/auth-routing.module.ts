import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { authGuard } from '../../core/guards/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
   {
     path: '',
     component: AuthComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
