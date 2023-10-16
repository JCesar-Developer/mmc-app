export interface IRole {
  id:      number;
  name:    string;
  type:    Role;
  created: string;
  updated: string;
}

export enum Role {
  admin     = "admin",
  customer  = "customer",
}
