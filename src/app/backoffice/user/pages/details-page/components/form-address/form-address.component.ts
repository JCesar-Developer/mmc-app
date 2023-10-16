import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'backoffice-form-address',
  templateUrl: './form-address.component.html'
})
export class FormAddressComponent {
  @Input() addressForm: FormGroup<{
    address: FormControl<string>;
    locality: FormControl<string>;
    state: FormControl<string>;
    postcode: FormControl<string>;
    country: FormControl<string>;
  }>;
}
