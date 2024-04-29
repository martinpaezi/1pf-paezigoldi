import { Component, OnInit } from '@angular/core';
import { IProfessors } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ProfessorsDialogComponent } from './components/professors-dialog/professors-dialog.component';
import { ProfessorsService } from './professors-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.scss'
})
export class ProfessorsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'course', 'role', 'createdAt', 'actions'];

  loading = false;

  professors: IProfessors[] = [];
  
  constructor(
    private matDialog: MatDialog,
    private professorsService: ProfessorsService 
    ) {}

  ngOnInit(): void {
    this.loading = true;
    this.professorsService.getProfessors().subscribe({
      next: (professors) => {
        this.professors = professors;
      },
      error: (err) => {
        Swal.fire('Error', '¡Oh no, ocurrió un error!', 'error');
      },
      complete: () => {
        this.loading = false;
      }
    })
  }


    openDialog(editingProfessor?: IProfessors): void {
      this.matDialog
      .open(ProfessorsDialogComponent, {
        data: editingProfessor,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if(result){

            if(editingProfessor) {
              this.professors = this.professors.map((s) => s.id === editingProfessor.id ? {...s, ...result} : s);
            } else {
              result.id = new Date().getTime().toString().substring(0,4);
              result.createdAt = new Date();
              this.professors = [...this.professors, result];
            }
          }
        },
      });
  }

  onDelete(id: number): void{
    if (confirm('¿Estás seguro que deseas eliminarlo?')){
    this.professors = this.professors.filter((s) => s.id != id)
  }}

}

 
