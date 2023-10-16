import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild('openModalButton') openModalButton: ElementRef<HTMLButtonElement>;

  @ViewChild('closeModalButton') closeModalButton: ElementRef<HTMLButtonElement>;

  @Output() accepted = new EventEmitter<void>();

  @Input() title: string = 'Modal title';

  @Input() txtBtnClose: string = 'Close';

  @Input() txtBtnSave: string = 'Save changes';

  @Input() disabled: boolean = false;

  constructor() { }

  openModal() {
    this.openModalButton.nativeElement.click();
  }

  closeModal() {
    this.closeModalButton.nativeElement.click();
  }

  emit() {
    this.accepted.emit();
  }

}
