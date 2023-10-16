import { Injectable } from '@angular/core';
import { IUserDetails } from '../interfaces/IPrivateUser-details.interface';
import { ITransaction } from '../interfaces/ITransaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _lastMonths: string[] = [];
  private _transactionsByMonth: ITransaction[] = [];
  private _lastTransactions: ITransaction[] = [];

  /**
   * Returns the current year.
   * @returns The current year as a number.
   */
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  // METHODS LAST MONTHS ---------------------------------------------------------------
  /**
   * Gets the list of the last six months.
   * @returns An array of the last six months as strings.
   */
    public getLastMonths(): string[] {
      this.setLastMonths();
      return [...this._lastMonths];
    }


  private setLastMonths(): void {
    const date = new Date();

    for (let i = 0; i < 6; i++) {
      const monthName = date.toLocaleString('en', { month: 'short' });
      this._lastMonths.unshift( monthName );
      date.setMonth(date.getMonth() - 1);
    }
  }

  // METHODS TRANSACTIONS BY MONTH -----------------------------------------------------
  /**
   * Gets the list with the sum of the transactions made for all the users provided for the privateUserService.
   * @returns An array of transactions grouped by month: { month: string, totalTransactions: number }.
   */
  public getTransactionsByMonth( users: IUserDetails[] ): ITransaction[] {
    this.setTransactionsByMonth( users );
    return [...this._transactionsByMonth];
  }

  private setTransactionsByMonth( users: IUserDetails[] ): void {

    users.forEach(user => {
      const totalTransactions = this.parseIntUserTransaction(user);
      const month = this.getMonthOfTransactions( user );

      const index = this._transactionsByMonth.findIndex( transaction => transaction.month === month );

      if( index === -1 ) {
        this._transactionsByMonth.push({ month, totalTransactions });
      } else {
        this._transactionsByMonth[index].totalTransactions += totalTransactions;
      }
    });
  }

  private parseIntUserTransaction( user: IUserDetails ): number|null {
    if( !user.totalTransactions ) return null;
    return parseInt(user.totalTransactions);
  }

  private getMonthOfTransactions( user: IUserDetails ): string|null {
    if( !user.lastTransaction ) return null;

    const month = user.lastTransaction.split('-')[1];
    const date = new Date();
    date.setMonth( parseInt(month) - 1 );

    return date.toLocaleString('en', { month: 'short' });
  }

  // METHODS LAST TRANSACTIONS ------------------------------------------------------------
  /**
   * Gets the list with the total of transactions made in the last six months.
   * @returns An array of the last transactions for the last six months: { month: string, totalTransactions: number }.
   */
  public getLastTransactions( lastMonths: string[], transactionsByMonth: ITransaction[] ) {
    this.setLastTransactions( lastMonths, transactionsByMonth );
    return [...this._lastTransactions];
  }

  private setLastTransactions( lastMonths: string[], transactionsByMonth: ITransaction[] ): void {

    lastMonths.forEach( month => {
      const index = transactionsByMonth.findIndex( transaction => transaction.month === month );

      if( index === -1 ) {
        this._lastTransactions.push({ month, totalTransactions: 0 });
      } else {
        this._lastTransactions.push( transactionsByMonth[index] );
      }
    });
  }

  // DESTROY --------------------------------------------------------------------------------
  /**
   * Destroys the data of the transactions.
   */
  public destroyTransactionData() {
    this._lastMonths = [];
    this._transactionsByMonth = [];
    this._lastTransactions = [];
  }

}
