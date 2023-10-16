import { Component, ViewChild } from '@angular/core';
import {} from '@angular/google-maps';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastComponent, ToastPosition } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'backoffice-details-page',
  templateUrl: './details-page.component.html',
  styles: [`.btn { width: 100%; }`]
})
export class DetailsPageComponent {

  @ViewChild(ToastComponent) toast: ToastComponent;

  addressForm = new FormGroup({
    address   : new FormControl<string>(''),
    locality  : new FormControl<string>('', Validators.required),
    state     : new FormControl<string>('', Validators.required),
    postcode  : new FormControl<string>('', Validators.required),
    country   : new FormControl<string>('', Validators.required)
  });


  setAddress( place: google.maps.places.PlaceResult ) {
    let address = "";
    let postcode = "";

    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          address = `${component.long_name} ${address}`;
          break;
        }

        case "route": {
          address += component.long_name;
          break;
        }

        case "postal_code": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }

        case "postal_code_suffix": {
          postcode = `${postcode}-${component.long_name}`;
          break;
        }

        case "locality": {
          this.addressForm.patchValue({ locality: component.long_name });
          break;
        }

        case "administrative_area_level_1": {
          this.addressForm.patchValue({ state: component.long_name });
          break;
        }

        case "country": {
          this.addressForm.patchValue({ country: component.long_name });
          break;
        }
      }
    }

    this.addressForm.patchValue({
      address: address,
      postcode: postcode
    });

  }

  onSaveAddress() {
    if (this.addressForm.invalid) return;

    console.log(this.addressForm.value);
    this.toast.class = 'bg-success text-light';
    this.toast.message = 'Address saved! (Look at the browser console)';
    this.toast.position = ToastPosition.TOP_RIGHT;
    this.toast.showToast();
  }

}
