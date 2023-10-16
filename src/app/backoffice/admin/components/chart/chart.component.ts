import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
// services
import { TransactionService } from '../../services/transaction.service';
// interfaces
import { ITransaction } from '../../interfaces/ITransaction.interface';
import { IUserDetails } from '../../interfaces/IPrivateUser-details.interface';
Chart.register(...registerables);

@Component({
  selector: 'bacckoffice-chart',
  templateUrl: './chart.component.html',
  styles: [`
    #piechart {
      width: 100% !important;
      height: 100% !important;
    }
  `]
})
export class ChartComponent implements OnInit, OnDestroy {

  @Input() public users: IUserDetails[] = [];

  private lastTransactions?: ITransaction[];

  constructor(
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.lastTransactions = this.getLastTransactions();

    const currentYear = this.transactionService.getCurrentYear();
    const months = this.getMonthsToRender( this.lastTransactions );
    const transactions = this.getTransactionsToRender( this.lastTransactions );

    this.RenderChart( currentYear, months, transactions );
  }

  getLastTransactions(): ITransaction[] {
    const lastMonths = this.transactionService.getLastMonths();
    const transactionsByMonty = this.transactionService.getTransactionsByMonth( this.users );
    return this.transactionService.getLastTransactions( lastMonths, transactionsByMonty );
  }

  getMonthsToRender( transactions: ITransaction[] ): string[] {
    return transactions.map( transaction => transaction.month );
  }

  getTransactionsToRender( transactions: ITransaction[] ): number[] {
    return transactions.map( transaction => transaction.totalTransactions );
  }

  RenderChart( currentYear: number, months: string[], transactions: number[] ) {
    const myChart = new Chart('piechart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: `Transactions ${ currentYear }`,
          data: transactions,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  })}

  ngOnDestroy(): void {
    this.transactionService.destroyTransactionData();
  }

}
