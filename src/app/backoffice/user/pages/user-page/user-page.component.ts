import { Component, OnInit, ViewChild,OnDestroy  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// components
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormComponent, FormConfig } from 'src/app/shared/components/form/form.component'
import { ToastComponent, ToastPosition } from 'src/app/shared/components/toast/toast.component';

// services
import { UserTransactionsService } from '../../services/user-transactions.service';

// interfaces
import { ITransaction, IPostTransaction } from './interfaces/user-interfaces';

@Component({
  selector: 'backoffice-user-page',
  templateUrl: './user-page.component.html'
})

export class UserPageComponent implements OnInit, OnDestroy {

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  @ViewChild(FormComponent) formComponent!: FormComponent;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  private subscriptions: Subscription[] = [];

  public formTransaction: FormConfig = {
    form: new FormGroup({
      detail: new FormControl<string>('', Validators.required),
      amount: new FormControl<number>(null, Validators.required),
    }),
    formFields: [
      { name: 'detail', type: 'text' },
      { name: 'amount', type: 'number' },
    ]
  }

  public disabledSubmitButton: boolean = false;
  public transactions?: ITransaction[];
  public totalAmount: number;

  constructor(
    private userTransactionsService: UserTransactionsService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
    this.subscribeToTotalAmount();
    this.subscribeToTransactions();
  }

  private getTransactions(): void {
    const subscription = this.userTransactionsService.getTransactions()
      .subscribe({
        next: transactions => this.transactions = transactions,
        error: error => this.showToastError( error )
      });

      this.subscriptions.push(subscription);
  }

  private subscribeToTotalAmount(): void {
    const subscription = this.userTransactionsService.totalAmount$
      .subscribe({
        next: totalAmount => this.totalAmount = totalAmount,
        error: () => this.showToastError('An error occurred while trying to connect to the server')
      });

      this.subscriptions.push(subscription);
  }

  private subscribeToTransactions(): void {
    const subscription = this.userTransactionsService.transactions$
      .subscribe({
        next: transactions => this.transactions = transactions,
        error: () => this.showToastError('An error occurred while trying to connect to the server')
      });

      this.subscriptions.push(subscription);
  }

  openModal(): void {
    this.modalComponent.openModal();
  }

  saveTransaction(): void {
    if( this.formTransaction.form.invalid ) return;

    this.disabledSubmitButton = true;

    const amount = parseFloat(this.formTransaction.form.value.amount );
    const detail = this.formTransaction.form.value.detail;

    const newTransaction: IPostTransaction = { amount, detail };
    this.userTransactionsService.postTransaction( newTransaction ).subscribe({
      next: () => {
        this.showSuccessToast();
        this.modalComponent.closeModal()
        this.formComponent.allowEnter();
        this.disabledSubmitButton = false;
      },
      error: error => {
        this.showToastError( error.message )
        this.formComponent.allowEnter();
        this.disabledSubmitButton = false;
      }
    });
  }

  showSuccessToast(): void {
    this.toastComponent.class = 'bg-success text-white';
    this.toastComponent.message = 'Transaction saved successfully';
    this.toastComponent.position = ToastPosition.TOP_RIGHT;
    this.toastComponent.showToast();
  }

  showToastError( errorMsg: string ) {
    this.toastComponent.class = 'bg-warning text-white';
    this.toastComponent.message = errorMsg;
    this.toastComponent.position = ToastPosition.BOTTOM;
    this.toastComponent.showToast();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
