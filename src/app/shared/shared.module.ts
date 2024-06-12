import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleSizeDirective } from './directives/title-size.directive';
import {MatListModule} from '@angular/material/list'; 


@NgModule({
  declarations: [
    FullNamePipe,
    TitleSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule, 
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    FullNamePipe,
    TitleSizeDirective,
    MatListModule,
    FormsModule,
  ]
})
export class SharedModule { }
