import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//pages
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

//components
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TableTransactionsComponent } from './pages/user-page/components/table-transactions/table-transactions.component';
import { PlaceAutocompleteComponent } from './pages/details-page/components/place-autocomplete/place-autocomplete.component';
import { FormAddressComponent } from './pages/details-page/components/form-address/form-address.component';
import { FormProfileComponent } from './pages/profile-page/components/form-profile/form-profile.component';



@NgModule({
  declarations: [
    UserPageComponent,
    DetailsPageComponent,
    TableTransactionsComponent,
    ProfilePageComponent,
    PlaceAutocompleteComponent,
    FormAddressComponent,
    FormProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,

    UserRoutingModule,
  ],
})
export class UserModule { }
