import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IInscription } from '../../models';
import { ICourse } from '../../../courses/models';
import { IStudents } from '../../../students/models';
import { StudentsService } from '../../../students/students.service';
import { CoursesService } from '../../../courses/courses.service';

@Component({
  selector: 'app-inscriptions-dialog',
  templateUrl: './inscriptions-dialog.component.html',
  styleUrls: ['./inscriptions-dialog.component.scss']
})
export class InscriptionsDialogComponent implements OnInit {

  inscriptionsForm: FormGroup;
  courses: ICourse[] = [];
  students: IStudents[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private matDialogRef: MatDialogRef<InscriptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingInscriptions: IInscription | null
  ) {
    this.inscriptionsForm = this.formBuilder.group({
      courseId: [editingInscriptions?.courseId || '', Validators.required],
      studentId: [editingInscriptions?.studentId || '', Validators.required],
    });
    if (editingInscriptions) {
      this.inscriptionsForm.patchValue(editingInscriptions);
    }
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  onSave(): void {
    if (this.inscriptionsForm.valid) {
      this.matDialogRef.close(this.inscriptionsForm.value);
    }
  }

  loadStudents() {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
    });
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => (this.courses = courses),
    });
  }
}
