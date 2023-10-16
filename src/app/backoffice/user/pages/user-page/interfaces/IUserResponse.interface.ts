// Generated by https://quicktype.io
import { IRole } from './IRole.interface';
import { ITransaction } from './ITransaction.interface';

export interface IUserResponse {
  data:   IUserTransaction;
  totals: ITotalAmount;
}

export interface IUserTransaction {
  id:           number;
  username:     string;
  created:      string;
  updated:      string;
  role:         IRole;
  transactions: ITransaction[];
}

export interface ITotalAmount {
  amount: string;
}
