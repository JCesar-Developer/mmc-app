import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, throwError, tap, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IUserDetails, IData } from '../interfaces/IPrivateUser-details.interface';
import { IUser } from 'src/app/auth/interfaces/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivateUserService {

  private readonly baseUrl = environment.baseUrl;
  private _users: IUserDetails[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<IUserDetails[]|null> {
    const url = `${ this.baseUrl }/private/users?related=transactions`;
    const userToken = localStorage.getItem('userToken');

    if( !userToken ) return of(null);

    const { user, token } = JSON.parse( userToken );
    const headers = new HttpHeaders().set('Authorization', `Bearer ${ token }`);

    return this.http.get<IData>( url, { headers } ).pipe(
      map((data: IData) => this.getOnlyUsers( data.data, user as IUser )),
      tap( users => this._users = users ),
      catchError(() => throwError(() => new Error('Se produjo un error al obtener los usuarios')))
    );
  }

  getMoreValuableUser()  {
    let moreValuableUser = this._users.reduce((prev, current) => {
      const prevTotalAmount = parseInt( prev?.totalAmount ?? '0 ');
      const currentTotalAmount = parseInt( current?.totalAmount ?? '0' );

      return (prevTotalAmount > currentTotalAmount) ? prev : current;
    });

    return moreValuableUser;
  }

  getLessValuableUser()  {
    let lessValuableUser = this._users.reduce((prev, current) => {
      const prevTotalAmount = parseInt( prev?.totalAmount ?? '0 ');
      const currentTotalAmount = parseInt( current?.totalAmount ?? '0' );

      return (prevTotalAmount < currentTotalAmount) ? prev : current;
    });

    return lessValuableUser;
  }

  private getOnlyUsers( users: IUserDetails[], userResp: IUser): IUserDetails[] {
    console.log('users', users);
    console.log('userResp', userResp);

    return users.filter( user => user.id !== userResp.id );
  }

}
