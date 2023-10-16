import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ToastComponent, ToastPosition } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild(ModalComponent) modalSaveChanges!: ModalComponent;

  @ViewChild(ToastComponent) toast!: ToastComponent;

  public canSave: boolean = false;

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    name: new FormControl(''),
    lastname: new FormControl(''),
    nif: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    preferences: new FormControl(''),
  });

  ngOnInit(): void {
    const { user } = JSON.parse( localStorage.getItem('userToken') );
    if( !user ) return;

    this.profileForm.controls['username'].setValue(user.username);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Aquí puedes hacer lo que quieras con el archivo seleccionado
  }

  openModal() {
    if( !this.profileForm.valid) return;
    this.modalSaveChanges.openModal();
  }

  saveChanges() {
    console.log('¡PUSH SUCCESS!', this.profileForm.value );

    this.modalSaveChanges.closeModal();
    this.toast.class = 'bg-success text-light';
    this.toast.message = 'Address saved! (Look at the browser console)';
    this.toast.position = ToastPosition.TOP_RIGHT;
    this.toast.showToast();
  }

}
