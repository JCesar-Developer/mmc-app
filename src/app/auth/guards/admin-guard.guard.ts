import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { Role } from '../interfaces/auth-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const url = state.url;
    localStorage.setItem( 'path', url );

    return this.authService.userRole.pipe(
      filter( role => role !== null ),
      map( role => {

        if ( role === Role.admin ) {
          return true;
        }
        else {
          this.router.navigateByUrl( 'mmc/user' );
          return false;
        }
      })
    );
  }

}
