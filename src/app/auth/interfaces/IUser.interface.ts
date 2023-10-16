import { IRole } from './IRole.interface';

export interface IUser {
  id:       number;
  username: string;
  role:     IRole;
}
