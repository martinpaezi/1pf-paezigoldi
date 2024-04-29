import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () => 
        import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'courses',
        loadChildren: () => 
        import('./pages/courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'inscriptions',
        loadChildren: () => 
        import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
      },
      {
        path: 'professors',
        loadChildren: () => 
        import('./pages/professors/professors.module').then((m) => m.ProfessorsModule),
      },
      {
        path: 'students',
        loadChildren: () => 
        import('./pages/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'classes',
        loadChildren: () => 
        import('./pages/classes/classes.module').then((m) => m.ClassesModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
