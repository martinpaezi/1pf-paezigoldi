import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserssRoutingModule } from './userss-routing.module';
import { UserssComponent } from './userss.component';
import { UserssDialogComponent } from './components/userss-dialog/userss-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/users.effects';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/users.reducer';

@NgModule({
  declarations: [
    UserssComponent,
    UserssDialogComponent
  ],
  imports: [
    CommonModule,
    UserssRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ]
})

export class UserssModule { }
