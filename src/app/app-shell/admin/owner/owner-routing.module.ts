import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { ResidentsComponent } from './apartment/residents/residents.component';
import { ReportsComponent } from './apartment/reports/reports.component';
import { ContractsComponent } from './apartment/contracts/contracts.component';
import { DocumentsComponent } from './apartment/documents/documents.component';
import { ReturnsComponent } from './apartment/returns/returns.component';
import { ChequesComponent } from './apartment/cheques/cheques.component';
import { NotificationsComponent } from './apartment/notifications/notifications.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
  },
  {
    path: ':aptId',
    component: ApartmentComponent,
    children: [
      {
        path: '',
        redirectTo: 'residents',
        pathMatch: 'full',
      },
      {
        path: 'residents',
        component: ResidentsComponent,
        outlet: 'action'
      },
      {
        path: 'reports',
        component: ReportsComponent,
        outlet: 'action'
      },
      {
        path: 'contract',
        component: ContractsComponent,
        outlet: 'action'
      },
      {
        path: 'cheques',
        component: ChequesComponent,
        outlet: 'action'
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        outlet: 'action'
      },
      {
        path: 'returns',
        component: ReturnsComponent,
        outlet: 'action'
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        outlet: 'action'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
