import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankComponent } from './blank.component';
import { Blank3RoutingModule } from './blank-3-routing.module';


@NgModule({
  declarations: [
    BlankComponent,
  ],
  imports: [
    CommonModule,
    Blank3RoutingModule
  ]
})
export class Blank3Module { }
