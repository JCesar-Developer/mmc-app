import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'backoffice-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent {
  @Input() profileForm: FormGroup<{
    username: FormControl<string>;
    name: FormControl<string>;
    lastname: FormControl<string>;
    nif: FormControl<string>;
    email: FormControl<string>;
    phone: FormControl<string>;
    preferences: FormControl<string>;
}>
}
