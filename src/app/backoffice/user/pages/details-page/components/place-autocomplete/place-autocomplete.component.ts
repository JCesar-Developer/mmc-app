import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import {} from '@angular/google-maps';

@Component({
  selector: 'user-place-autocomplete',
  template: `
    <input [placeholder]="placeholder" #inputField type="text" class="form-control">
  `
})
export class PlaceAutocompleteComponent implements AfterViewInit, OnDestroy {

  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;

  @Input() placeholder = 'Enter address...';

  @Output() placeChanged = new EventEmitter<google.maps.places.PlaceResult>();

  private autocomplete: google.maps.places.Autocomplete;

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete( this.inputField.nativeElement, {
      fields: ["address_components", "geometry"],
      types: ["address"],
    });

    this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete?.getPlace();
        this.placeChanged.emit(place);
    })
  }

  ngOnDestroy() {
    if( this.autocomplete ) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
