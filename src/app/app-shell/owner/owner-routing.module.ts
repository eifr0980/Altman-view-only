import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { OwnerComponent } from './owner.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { MyResidentsComponent } from './apartment/my-residents/my-residents.component';
import { ReportsComponent } from './apartment/reports/reports.component';
import { ContractComponent } from './apartment/contract/contract.component';
import { ChequesComponent } from './apartment/cheques/cheques.component';
import { DocumentsComponent } from './apartment/documents/documents.component';
import { ReturnsComponent } from './apartment/returns/returns.component';
import { NotificationsComponent } from './apartment/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'myApartments',
    pathMatch: 'full'
  },
  {
    path: 'myApartments',
    component: OwnerComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: ':id',
        component: ApartmentComponent,
        children: [
          {
            path: '',
            redirectTo: 'myResidents',
            outlet: 'action'
          },
          {
            path: 'myResidents',
            component: MyResidentsComponent,
            outlet: 'action'
          },
          {
            path: 'reports',
            component: ReportsComponent,
            outlet: 'action'
          },
          {
            path: 'contract',
            component: ContractComponent,
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
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
