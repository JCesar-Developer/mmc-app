import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//module
import { BackofficeRoutingModule } from './backoffice-routing.module';

//pages
import { LayoutPageComponent } from './layout/layout-page.component';

//components
import { HeaderComponent } from './layout/components/header/header.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { SidebarItemComponent } from './layout/components/sidebar/sidebar-item/sidebar-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    //pages
    LayoutPageComponent,

    //components
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SidebarItemComponent,
  ],
  imports: [
    CommonModule,

    SharedModule,
    BackofficeRoutingModule,
  ]
})
export class BackofficeModule { }
