import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
      },
      {
        path: ':id',
        loadChildren: () => import('./owner/owner.module').then(mod => mod.OwnerModule),
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
