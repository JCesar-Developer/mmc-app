import { Component, Output, EventEmitter } from '@angular/core';
import { ISidebarItem } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'backoffice-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() activeSideBar = new EventEmitter<boolean>();

  public isActive = false;

  public sidebarItems: ISidebarItem[] = [
    { navigateTo: '/mmc/user', itemName: 'Transactions' },
    { navigateTo: '/mmc/user/details', itemName: 'Maps' },
    { navigateTo: '/mmc/user/profile', itemName: 'My profile' },
  ]

  toggleSidebar() {
    this.isActive = !this.isActive;
    this.activeSideBar.emit(this.isActive);
  }

}
