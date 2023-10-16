import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// services
import { AuthService } from '../../services/auth.service';

// components
import { FormComponent, FormConfig } from '../../../shared/components/form/form.component';
import { ToastComponent, ToastPosition } from '../../../shared/components/toast/toast.component';

// interfaces
import { Role } from '../../interfaces/auth-interfaces';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @ViewChild(FormComponent) formComponent!: FormComponent;

  //stevewade
  public authForm: FormConfig = {
    form: new FormGroup({
      username: new FormControl<string>('janedoe', Validators.required),
      password: new FormControl<string>('123456', Validators.required),
    }),
    formFields: [
      { name: 'username', type: 'text' },
      { name: 'password', type: 'password' }
    ]
  };

  public isLoggingIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onLogin(): void {
    if( !this.authForm.form.valid ) return;

    const { username, password } = this.authForm.form.value;

    this.isLoggingIn = true;
    this.showLoginToast();

    this.authService.login(username, password)
      .subscribe(success => {

        if (success) {
          this.authService.userRole.subscribe(role => {
            if( role === null ) return;
            else if( role === Role.admin ) this.router.navigateByUrl('/mmc/admin');
            else if (role === Role.customer) this.router.navigateByUrl('/mmc/user');
          });
        } else {
          this.isLoggingIn = false;
          this.formComponent.allowEnter();
          this.showNotAuthorizedToast();
        }

      }
    );
  }

  showLoginToast(): void {
    this.toastComponent.class = 'bg-warning text-white';
    this.toastComponent.message = 'Cargando...';
    this.toastComponent.position = ToastPosition.TOP_RIGHT;
    this.toastComponent.showToast();
  }

  showNotAuthorizedToast(): void {
    this.toastComponent.hideToast();
    this.toastComponent.class = 'bg-danger text-white';
    this.toastComponent.message = 'Error, usuario o contraseña incorrectos.';
    this.toastComponent.position = ToastPosition.BOTTOM;
    this.toastComponent.showToast();
  }

}
