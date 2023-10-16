import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Role } from '../../auth/interfaces/IRole.interface';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'backoffice-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent implements OnInit {

  @ViewChild( 'screenElement' ) screenElement: ElementRef;
  @ViewChild( SidebarComponent ) sidebarComponent!: SidebarComponent;

  public admin: boolean = false;
  public showScreenLooker: boolean = false;

  ngOnInit(): void {
    this.admin = this.isAdmin();
  }

  isAdmin(): boolean {
    const userToken = localStorage.getItem('userToken');
    const { user } = JSON.parse( userToken! );
    return user.role.type === Role.admin;
  }

  toogleScreenLooker( activateScreenLooker: boolean ) {
    if( activateScreenLooker ) this.openScreenLooker();
    else this.closeScreenLooker();
  }

  private openScreenLooker() {
    const screenLooker = this.screenElement.nativeElement as HTMLElement;
    this.showScreenLooker = true;
    screenLooker.classList.remove('screen-hidden');
  }

  private closeScreenLooker() {
    const screenLooker = this.screenElement.nativeElement as HTMLElement;
    this.showScreenLooker = false;
    setTimeout(() => {
      screenLooker.classList.add('screen-hidden');
    }, 400);
  }

  onCloseScreenLooker() {
    this.sidebarComponent.toggleSidebar();
  }
}
