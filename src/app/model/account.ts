import { AppUser } from './appUser';

export interface Account {
  id: number;
  name: string;
  address: String;
  city: String;
  state: String;
  acc_no: number;
  balance: number;
  user_id?: number;
  username:String;
}
