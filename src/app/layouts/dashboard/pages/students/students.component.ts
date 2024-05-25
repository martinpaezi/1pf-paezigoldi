import { Component } from '@angular/core';
import { IStudents } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'course', 'role', 'createdAt', 'actions'];
  students: IStudents[] = [];

  constructor(private matDialog: MatDialog) {}

  openDialog(editingStudent?: IStudents): void {
    this.matDialog.open(StudentsDialogComponent, {
      data: editingStudent,
    }).afterClosed().subscribe(result => {
      if (result) {
        if (editingStudent) {
          this.students = this.students.map(s => s.id === editingStudent.id ? {...s, ...result} : s);
        } else {
          result.id = new Date().getTime();
          result.createdAt = new Date();
          this.students = [...this.students, result];
        }
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminarlo?')) {
      this.students = this.students.filter(s => s.id !== id);
    }
  }
}
