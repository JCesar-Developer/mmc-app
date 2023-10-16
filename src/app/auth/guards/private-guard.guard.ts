import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, filter } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const url = state.url;
    localStorage.setItem( 'path', url );

    return this.authService.authStatus.pipe(
      filter( authStatus => authStatus !== AuthStatus.checking ),
      map( authStatus => {

        if (authStatus === AuthStatus.authenticated) {
          return true;
        }
        else {
          this.router.navigateByUrl('/auth/login');
          return false;
        }

      })
    );
  }
}
