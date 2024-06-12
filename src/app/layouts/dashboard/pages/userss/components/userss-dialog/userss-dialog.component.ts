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
      password: [editingUserss?.password || '', Validators.required],
      email: [editingUserss?.email || '', [Validators.required, Validators.email]],
      role: [editingUserss?.role || 'ADMIN', Validators.required],
    });
    if (editingUserss) {
      this.userssForm.patchValue(editingUserss);
    }
  }

  onSave(): void {
    if (this.userssForm.invalid) {
      this.userssForm.markAllAsTouched();
    } else {
        this.matDialogRef.close(this.userssForm.value);
    }
  }
}