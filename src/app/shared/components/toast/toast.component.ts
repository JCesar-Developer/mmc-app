import { Component, Input, ViewChild, ElementRef } from '@angular/core';

export enum ToastPosition {
  TOP         = 'top',
  TOP_RIGHT   = 'top-right',
  BOTTOM_RIGHT= 'bottom-right',
  BOTTOM      = 'bottom'
}

@Component({
  selector: 'shared-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  //Variables ---------------------------------------------------------------------
  @Input()
  private _class: string = 'bg-warning text-white';

  @Input()
  private _message: string = 'This is a toast component';

  @Input()
  public position: ToastPosition = ToastPosition.TOP_RIGHT;

  @ViewChild('toastComponent')
  public toastComponent?: ElementRef<HTMLElement>;

  public show: boolean = false;

  //Getters and Setters -----------------------------------------------------------
  get class(): string { return this._class; }

  set class (value: string) { this._class = value }

  get message(): string { return this._message; }

  set message (value: string) { this._message = value }

  //Methods ----------------------------------------------------------------------
  showToast() {

    const toastComponent = this.toastComponent!.nativeElement;

    if (toastComponent) {
      toastComponent.classList.remove('d-none');
      toastComponent.classList.remove('fade-out');
      toastComponent.classList.add('fade-in');

      setTimeout(() => {
        toastComponent.classList.remove('fade-in');
        toastComponent.classList.add('fade-out');
      }, 5000);
    }
  }

  hideToast() {
    const toastComponent = this.toastComponent!.nativeElement;
    toastComponent.classList.add('fade-out');
  }

}
