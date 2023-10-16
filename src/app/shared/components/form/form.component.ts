import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface FormConfig {
  form: FormGroup;
  formFields: { name: string, type: string }[];
}

/**
 * @description To use this component it's necesary to import its interface and to pass the form and the formFields to the component.
 * @interface FormConfig @description { form: FormGroup, formFields: { name: string, type: string }[] }
 *
 */
@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() public formConfig!: FormConfig;

  @Output() public submit = new EventEmitter<void>();

  private isEnterAllowed: boolean = true;

  onSubmit() {
    for (const field of this.formConfig.formFields) {
      const control = this.formConfig.form.get(field.name);
      if (control) {
        control.markAsTouched();
      }
    }

    if( !this.isEnterAllowed ) return;

    if (this.formConfig.form.valid) {
      this.isEnterAllowed = false;
      this.submit.emit();
    }
  }

  allowEnter() {
    this.isEnterAllowed = true;
  }


}
