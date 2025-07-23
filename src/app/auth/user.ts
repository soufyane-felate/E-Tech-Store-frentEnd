export interface User {
  id?: number;
  name?: string;
  username: string;
  email: string;
  password?: string;
  role?: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  REPAIRMAN = 'REPAIRMAN',
  CLIENT = 'CLIENT'
}
