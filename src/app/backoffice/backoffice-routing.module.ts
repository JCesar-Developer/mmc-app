import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, UserGuard } from '../auth/guards/auth-guards';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [ AdminGuard ],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'user',
    canActivate: [ UserGuard ],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
