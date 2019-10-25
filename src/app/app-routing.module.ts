import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AdminGuard } from '@login/_helpers';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app-shell/owner/owner.module').then(mod => mod.OwnerModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./app-shell/admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./shared/login/login.module').then(mod => mod.LoginModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

