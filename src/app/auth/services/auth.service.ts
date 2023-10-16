import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, tap, catchError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { IUser, ILoginResponse, Role, IUserStore, AuthStatus } from '../interfaces/auth-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  private readonly baseUrl: string = environment.baseUrl;
  private _currentUser = new BehaviorSubject<IUser | null>(null);
  private _authStatus = new BehaviorSubject<AuthStatus>(AuthStatus.checking);
  private _userRole = new BehaviorSubject<Role | null>(null);

  // Constructor
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.checkAuthStatus();
  }

  // Getters
  get currentUser(): Observable<IUser> {
    return this._currentUser.asObservable();
  }

  get authStatus(): Observable<AuthStatus> {
    return this._authStatus.asObservable();
  }

  get userRole(): Observable<Role> {
    return this._userRole.asObservable();
  }

  // Public methods
  login( username: string, password: string ): Observable<boolean> {
    const url   = `${ this.baseUrl }/login`;
    const body  = { username, password };

    return this.http.post<ILoginResponse>( url, body ).pipe(
      tap( ({ user, auth }) => {
        const { token } = auth;

        this.updateUserServiceData( user );
        this.saveUserIntoStorage( user, token );

      }),
      map( () => true ),
      catchError( () => of(false) )
    );
  }

  checkAuthStatus(): void {
    const userToken = localStorage.getItem('userToken');

    if( !userToken ) {
      this._authStatus.next( AuthStatus.notAuthenticated );
      return;
    }
    else {
      const { user, token } = JSON.parse( userToken );

      this.checkTokenStatus( user as IUser, token )
        .subscribe( validToken => {

          if ( !validToken ) {
            localStorage.removeItem('userToken');
            this._authStatus.next( AuthStatus.notAuthenticated );
          }
          else {
            this.updateUserServiceData( user );
            this._authStatus.next( AuthStatus.authenticated );
          }

        }
      );
    }
  }

  logout(): void {
    this.router.navigateByUrl( '/auth/login' );
    localStorage.removeItem( 'userToken' );
    localStorage.removeItem( 'path' );
    this._authStatus.next( AuthStatus.notAuthenticated );
    this._currentUser.next( null );
    this._userRole.next( null );
  }

  // Private methods
  private updateUserServiceData( user: IUser ): void {
    this._currentUser.next( user );
    this._authStatus.next( AuthStatus.authenticated );
    this.updateRole( user );
  }

  private saveUserIntoStorage( user: IUser, token: string ): void {
    const userStorage: IUserStore = { user, token }
    localStorage.setItem( 'userToken', JSON.stringify( userStorage ) );
  }

  private updateRole(user: IUser): void {
    switch (user.role.id) {
      case 1:
        this._userRole.next(Role.admin);
        break;
      case 2:
        this._userRole.next(Role.customer);
        break;
      default:
        this._userRole.next(null);
        break;
    }
  }

  //TODO: Revisar biblioteca de JWT para Angular.
  private checkTokenStatus( user: IUser, token: string ): Observable<boolean> {
    const userRole = user.role.type;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ token }`);

    let url: string;

    if (userRole === Role.admin) {
      url = `${this.baseUrl}/private/users`;
    }
    else if (userRole === Role.customer) {
      url = `${this.baseUrl}/user`;
    }
    else {
      return of(false);
    }

    return this.http.get(url, { headers }).pipe(
      map( () => true ),
      catchError( () =>  of(false) )
    );
  }

}
