import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent, AddApartmentDialogComponent } from './owner.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApartmentComponent } from './apartment/apartment.component';
import { ResidentsComponent } from './apartment/residents/residents.component';
import { ReportsComponent, AddReportDialogComponent } from './apartment/reports/reports.component';
import { ContractsComponent, AddContractDialogComponent, AddResidentDialogComponent } from './apartment/contracts/contracts.component';
import { ChequesComponent, AddChequeDialogComponent } from './apartment/cheques/cheques.component';
import { DocumentsComponent, AddDocumentDialogComponent } from './apartment/documents/documents.component';
import { ReturnsComponent } from './apartment/returns/returns.component';
import { NotificationsComponent } from './apartment/notifications/notifications.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WarningMessageModule } from 'src/app/shared/warning-message/warning-message.module';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    OwnerComponent,
    AddApartmentDialogComponent,
    AddContractDialogComponent,
    AddResidentDialogComponent,
    AddReportDialogComponent,
    AddChequeDialogComponent,
    AddDocumentDialogComponent,
    ApartmentComponent,
    ResidentsComponent,
    ReportsComponent,
    ContractsComponent,
    ChequesComponent,
    DocumentsComponent,
    ReturnsComponent,
    NotificationsComponent
  ],
  entryComponents: [
    AddApartmentDialogComponent,
    AddContractDialogComponent,
    AddResidentDialogComponent,
    AddReportDialogComponent,
    AddChequeDialogComponent,
    AddDocumentDialogComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    WarningMessageModule,
    MatSelectModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class OwnerModule { }
