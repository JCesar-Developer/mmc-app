import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//modules
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

//Pages
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
