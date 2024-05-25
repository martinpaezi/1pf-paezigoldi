import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserss } from '../../models';

@Component({
  selector: 'app-userss-dialog',
  templateUrl: './userss-dialog.component.html',
  styleUrls: ['./userss-dialog.component.scss']
})
export class UserssDialogComponent {

  userssForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UserssDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingUserss: IUserss | null
  ) {
    this.userssForm = this.formBuilder.group({
      firstName: [editingUserss?.firstName || '', Validators.required],
      lastName: [editingUserss?.lastName || '', Validators.required],
      email: [editingUserss?.email || '', [Validators.required, Validators.email]],
      course: [editingUserss?.course || '', Validators.required],
      role: [editingUserss?.role || 'ESTUDIANTE', Validators.required],
    });
  }

  onSave(): void {
    if (this.userssForm.valid) {
      this.matDialogRef.close(this.userssForm.value);
    }
  }
}
