import { Component, Input } from '@angular/core';
import { IUserDetails } from './../../interfaces/IPrivateUser-details.interface';

@Component({
  selector: 'backoffice-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent {

  @Input()
  public users!: IUserDetails[];

  toggleDetails( user: IUserDetails ) {
    user.showDetails = !user.showDetails;
  }

}
