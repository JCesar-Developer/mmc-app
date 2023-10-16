import { Component, Input } from '@angular/core';

export interface ISidebarItem {
  navigateTo: string;
  itemName: string;
}

@Component({
  selector: 'backoffice-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent {

  @Input() sidebarItem: ISidebarItem;

}
