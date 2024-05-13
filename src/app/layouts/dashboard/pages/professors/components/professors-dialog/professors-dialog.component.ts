import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProfessors } from '../../models';

@Component({
  selector: 'app-professors-dialog',
  templateUrl: './professors-dialog.component.html',
  styleUrl: './professors-dialog.component.scss'
})
export class ProfessorsDialogComponent {

  professorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private matDialogRef: MatDialogRef<ProfessorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingProfessor?: IProfessors,
  ) {
    this.professorForm = this.formBuilder.group({
      id: [null],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      course: ['', [Validators.required]],
      role: ['PROFESOR', [Validators.required]],
      createdAt: [null]
    });

    if (this.editingProfessor) {
      this.professorForm.patchValue(this.editingProfessor);
    }
  }

  onSave(): void {
    if (this.professorForm.invalid) {
      this.professorForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.professorForm.value);
    }
  }
}


