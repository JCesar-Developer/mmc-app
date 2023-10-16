import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const path = localStorage.getItem( 'path' );

    return this.authService.authStatus.pipe(
      filter( authStatus => authStatus !== AuthStatus.checking ),
      map( authStatus => {

        if (authStatus === AuthStatus.authenticated) {
          this.router.navigateByUrl( path );
          return false;
        }
        else {
          return true;
        }

      })
    );
  }
}
