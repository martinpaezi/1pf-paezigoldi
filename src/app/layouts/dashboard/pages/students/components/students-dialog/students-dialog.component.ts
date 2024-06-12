import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudents } from '../../models';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent {
  studentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingStudent: IStudents | null,
  ) {
    this.studentForm = this.formBuilder.group({
      firstName: [editingStudent?.firstName || '', [Validators.required]],
      lastName: [editingStudent?.lastName || '', [Validators.required]],
      email: [editingStudent?.email || '', [Validators.required, Validators.email]],
      course: [editingStudent?.course || '', [Validators.required]],
      role: [editingStudent?.role || 'ESTUDIANTE', [Validators.required]]
    });
    if (editingStudent) {
      this.studentForm.patchValue(editingStudent);
    }
  }

  onSave(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentForm.value);
    }
  }
}