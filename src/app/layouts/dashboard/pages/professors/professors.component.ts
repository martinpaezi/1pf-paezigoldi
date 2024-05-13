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
    });
  }

  openDialog(editingProfessor?: IProfessors): void {
    const dialogRef = this.matDialog.open(ProfessorsDialogComponent, {
      data: editingProfessor ? {...editingProfessor} : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (editingProfessor) {
          this.updateProfessor(editingProfessor.id, result);
        } else {
          this.createProfessor(result);
        }
      }
    });
  }

  createProfessor(professor: IProfessors): void {
    professor.createdAt = new Date();
    this.professorsService.createProfessor(professor).subscribe({
      next: (professorCreated) => {
        this.professors.push(professorCreated);
      },
      error: (err) => {
        Swal.fire('Error', '¡Oh no, ocurrió un error!', 'error');
      }
    });
  }

  updateProfessor(id: number, professor: IProfessors): void {
    this.professorsService.updateProfessor(id, professor).subscribe({
      next: (updatedProfessor) => {
        const index = this.professors.findIndex(p => p.id === id);
        if (index !== -1) {
          this.professors[index] = updatedProfessor;
        }
      },
      error: (err) => {
        Swal.fire('Error', '¡Oh no, ocurrió un error!', 'error');
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminarlo?')){
      this.professorsService.deleteProfessor(id).subscribe({
        next: () => {
          this.professors = this.professors.filter((s) => s.id !== id);
        },
        error: (err) => {
          Swal.fire('Error', '¡Oh no, ocurrió un error!', 'error');
        }
      });
    }
  }
}