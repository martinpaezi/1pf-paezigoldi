import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    InscriptionsComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class InscriptionsModule { }
