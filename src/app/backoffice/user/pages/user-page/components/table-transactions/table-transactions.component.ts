import { Component, Input } from '@angular/core';
import { ITransaction } from '../../interfaces/user-interfaces';

@Component({
  selector: 'user-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrls: ['./table-transactions.component.scss']
})
export class TableTransactionsComponent {

  @Input() public userTransactions!: ITransaction[];

}
