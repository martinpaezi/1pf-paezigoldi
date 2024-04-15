import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudents } from '../../models';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrl: './students-dialog.component.scss'
})
export class StudentsDialogComponent {
  studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingStudent?: IStudents,
    ) {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      // [Validators.required, Validators.pattern]
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      course: ['', [Validators.required]],
      role: ['STUDENT', [Validators.required]]
    });

    if(editingStudent){
      this.studentForm.patchValue(editingStudent)
    }
  }

  onSave(): void {
    if(this.studentForm.invalid) {
      this.studentForm.markAllAsTouched
    } else {
      this.matDialogRef.close(this.studentForm.value)
    }
  }
}
