import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError, map, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { IUserResponse, ITransaction, IPostTransaction, IPostTransactionResponse } from '../pages/user-page/interfaces/user-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserTransactionsService {

  // Variables
  private readonly baseUrl = environment.baseUrl;
  private _transactions$ = new BehaviorSubject<ITransaction[]>([]);
  private _totalAmount$ = new BehaviorSubject<number>(0);

  // Constructor
  constructor(
    private http: HttpClient,
  ) { }

  // Getters
  get transactions$(): Observable<ITransaction[]> {
    return this._transactions$.asObservable();
  }

  get totalAmount$(): Observable<number> {
    return this._totalAmount$.asObservable();
  }

  // Public-methods ------------------------------------------------------------------------------------------
  private getUserToken(): string {
    const userToken = localStorage.getItem('userToken');
    const { token } = JSON.parse(userToken);
    return token;
  }

  getTransactions(): Observable<ITransaction[]> {
    const token = this.getUserToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${ token }` });

    return this.http.get<IUserResponse>(`${this.baseUrl}/user`, { headers } ).pipe(
      tap( ( userResponse: IUserResponse) => this.updateTotalAmount( userResponse ) ),
      map( ( userResponse: IUserResponse) => userResponse.data.transactions ),
      tap( transactions => this.updateTransactions( transactions ) ),
      catchError(() => throwError(() => new Error( 'An error occurred while getting users' )))
    );
  }

  postTransaction( transaction: IPostTransaction ): Observable<boolean> {
    const token = this.getUserToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${ token }` });

    return this.http.post<IPostTransactionResponse>(`${this.baseUrl}/user/transaction`, transaction, { headers })
      .pipe(
        map( ( postTransactionResponse: IPostTransactionResponse ) => this.mapTransactionResponse(postTransactionResponse)),
        tap( newTransaction => this.updateTransactionAndTotalAmount(newTransaction, transaction.amount)),
        map(() => true),
        catchError(() => throwError(() => new Error( 'An error occurred while trying to connect to the server' )))
      )
  }

  // Private-methods ------------------------------------------------------------------------------------------
  // Private-methods-to-getTransactions
  private updateTotalAmount(userResponse: IUserResponse): void {
    const newTotalAmount = parseFloat(userResponse.totals.amount);
    this._totalAmount$.next(newTotalAmount);
  }

  private updateTransactions(transactions: ITransaction[]): void {
    this._transactions$.next(transactions);
  }

  // Private-methods-to-postTransaction
  private mapTransactionResponse(postTransactionResponse: IPostTransactionResponse): ITransaction {
    const { id, detail, amount, created, updated } = postTransactionResponse;
    return { id, detail, amount, created, updated } as ITransaction;
  }

  private updateTransactionAndTotalAmount(newTransaction: ITransaction, transactionAmount: number): void {
    const transactions = [...this._transactions$.value, newTransaction];
    this._transactions$.next(transactions);

    const newTotalAmount = this._totalAmount$.value + transactionAmount;
    this._totalAmount$.next(newTotalAmount);
  }
}
