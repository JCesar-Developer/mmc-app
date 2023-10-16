import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { PrivateGuard, PublicGuard } from './auth/guards/auth-guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ PublicGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'mmc',
    canActivate: [ PrivateGuard ],
    loadChildren: () => import('./backoffice/backoffice.module').then( m => m.BackofficeModule ),
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'mmc',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
