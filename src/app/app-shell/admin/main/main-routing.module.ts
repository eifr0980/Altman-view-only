import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { OwnersComponent } from './owners/owners.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { TasksComponent } from './tasks/tasks.component';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'owners',
        pathMatch: 'full'
      },
      {
        path: 'owners',
        component: OwnersComponent
      },
      {
        path: 'apartments',
        component: ApartmentsComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
