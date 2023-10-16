import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IUserDetails } from '../../interfaces/IPrivateUser-details.interface';

import { ToastComponent, ToastPosition } from 'src/app/shared/components/toast/toast.component';
import { PrivateUserService } from '../../services/private-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'backoffice-admin-page',
  templateUrl: './admin-page.component.html',
  styles: [`
    @media (max-width: 992px) {
      #table-component {
        margin-bottom: 3rem;
      }
    }
  `]
})
export class AdminPageComponent implements OnInit, OnDestroy  {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  public users: IUserDetails[] = [];
  public moreValuableUser?: IUserDetails;
  public lessValuableUser?: IUserDetails;

  private privateUserDataSubscription?: Subscription;

  constructor(
    private privateUserService: PrivateUserService,
  ) {}

  ngOnInit(): void {

    this.privateUserDataSubscription = this.privateUserService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.moreValuableUser = this.privateUserService.getMoreValuableUser();
        this.lessValuableUser = this.privateUserService.getLessValuableUser();
      },
      error: () => this.showCantLoadDataToast()
    });
  }

  showCantLoadDataToast(): void {
    this.toastComponent.hideToast();
    this.toastComponent.class = 'bg-dark text-white';
    this.toastComponent.message = 'Se produjo un error al obtener los usuarios.';
    this.toastComponent.position = ToastPosition.BOTTOM;
    this.toastComponent.showToast();
  }

  ngOnDestroy(): void {
    if (this.privateUserDataSubscription) {
      this.privateUserDataSubscription.unsubscribe();
    }
  }


}
