import { IUser } from './IUser.interface';

export interface ILoginResponse {
  user: IUser;
  auth: IAuth;
}

export interface IAuth {
  token:  string;
  expiry: string;
}
