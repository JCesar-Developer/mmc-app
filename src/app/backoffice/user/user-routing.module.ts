import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from '../layout/layout-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: UserPageComponent, pathMatch: 'full' },
      { path: 'details', component: DetailsPageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
