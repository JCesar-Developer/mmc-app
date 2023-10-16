import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-btn-collapse-menu',
  templateUrl: './btn-collapse-menu.component.html',
  styleUrls: ['./btn-collapse-menu.component.scss']
})
export class BtnCollapseMenuComponent {

  @Output() emit = new EventEmitter<void>();

  onEmit() {
    this.emit.emit();
  }

}
