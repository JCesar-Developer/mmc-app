import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'backoffice-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentDateTime = new Date();
  public username?: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.username = this.getUsername();
  }

  private getUsername(): string {
    const userToken = localStorage.getItem('userToken');
    const { user } = JSON.parse( userToken! );
    return user.username;
  }

  onLogout() {
    this.authService.logout();
  }
}
