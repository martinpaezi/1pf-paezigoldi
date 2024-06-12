import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.scss'
})
export class CoursesDialogComponent {

  coursesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingCourse: ICourse | null
  ) {
    this.coursesForm = this.formBuilder.group({
      course: [editingCourse?.course || '', Validators.required],
      students: [editingCourse?.students || '', Validators.required],
    });
    if (editingCourse) {
      this.coursesForm.patchValue(editingCourse);
    }
  }

  onSave(): void {
    if (this.coursesForm.invalid) {
      this.coursesForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.coursesForm.value);
    }
  }
}