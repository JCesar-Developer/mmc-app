import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//pages
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

//components
import { BtnCollapseMenuComponent } from './components/btn-collapse-menu/btn-collapse-menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FormInputComponent } from './components/form-input/form-input.component';

//pipes
import { NullToZeroPipe } from './pipes/null-to-zero.pipe';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    //pages
    Error404PageComponent,

    //components
    BtnCollapseMenuComponent,
    FormComponent,
    FormInputComponent,
    ModalComponent,
    SpinnerComponent,
    ToastComponent,
    TooltipComponent,

    //pipes
    NullToZeroPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    //pages
    Error404PageComponent,

    //components
    BtnCollapseMenuComponent,
    FormComponent,
    FormInputComponent,
    ModalComponent,
    SpinnerComponent,
    ToastComponent,
    TooltipComponent,

    //pipes
    NullToZeroPipe,
  ]
})
export class SharedModule { }
