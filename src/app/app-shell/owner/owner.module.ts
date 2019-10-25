import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { OwnerComponent } from './owner.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApartmentComponent } from './apartment/apartment.component';
import { MyResidentsComponent } from './apartment/my-residents/my-residents.component';
import { ReportsComponent } from './apartment/reports/reports.component';
import { ContractComponent } from './apartment/contract/contract.component';
import { ChequesComponent } from './apartment/cheques/cheques.component';
import { DocumentsComponent } from './apartment/documents/documents.component';
import { ReturnsComponent } from './apartment/returns/returns.component';
import { NotificationsComponent } from './apartment/notifications/notifications.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    WelcomeComponent,
    OwnerComponent,
    ApartmentComponent,
    MyResidentsComponent,
    ReportsComponent,
    ContractComponent,
    ChequesComponent,
    DocumentsComponent,
    ReturnsComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    NavBarModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class OwnerModule { }
