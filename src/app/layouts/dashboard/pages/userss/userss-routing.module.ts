import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserssComponent } from './userss.component';

const routes: Routes = [
  {
    path: '',
    component: UserssComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserssRoutingModule { }
