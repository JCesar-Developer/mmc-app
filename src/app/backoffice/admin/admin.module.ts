import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

//Pages
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

//Components
import { TableUsersComponent } from './components/table-users/table-users.component';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    //Pages
    AdminPageComponent,

    //Components
    TableUsersComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    AdminRoutingModule,
  ],
})
export class AdminModule { }
