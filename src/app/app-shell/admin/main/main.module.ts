import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { OwnersComponent, AddOwnerDialogComponent } from './owners/owners.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MainComponent,
    OwnersComponent,
    ApartmentsComponent,
    TasksComponent,
    AddOwnerDialogComponent
  ],
  entryComponents: [
    OwnersComponent,
    AddOwnerDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MainModule { }
