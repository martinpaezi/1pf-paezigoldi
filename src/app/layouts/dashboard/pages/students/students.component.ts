import { Component } from '@angular/core';
import { IStudents } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'course', 'role', 'createdAt', 'actions'];

  students: IStudents[] = [
    {
      id: 1,
      firstName: 'Martin',
      lastName: 'Paez',
      fullName: '',
      course: 'Angular',
      email: 'martin@mail.com',
      role: 'ADMIN',
      createdAt: new Date()
    },
    {
      id: 2,
      firstName: 'Andres',
      lastName: 'Igoldi',
      fullName: '',
      email: 'andres@mail.com',
      course: 'Marketing',
      role: 'ESTUDIANTE',
      createdAt: new Date()
    }
  ];

  
  constructor(
    private matDialog: MatDialog  ) {}


    openDialog(editingStudent?: IStudents): void {
      this.matDialog
      .open(StudentsDialogComponent, {
        data: editingStudent,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if(result){

            if(editingStudent) {
              this.students = this.students.map((s) => s.id === editingStudent.id ? {...s, ...result} : s);
            } else {
              result.id = new Date().getTime().toString().substring(0,4);
              result.createdAt = new Date();
              this.students = [...this.students, result];
            }
          }
          // console.log(result);
        },
      });
  }

  onDelete(id: number): void{
    if (confirm('¿Estás seguro que deseas eliminarlo?')){
    this.students = this.students.filter((s) => s.id != id)
  }}

}
