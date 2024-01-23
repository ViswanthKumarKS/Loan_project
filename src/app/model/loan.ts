import { AppUser } from './appUser';

export interface Loan {
  id: number;
  amount: number|null;
  approved: boolean;
  loanType: String;
  user_id?: number;
  username: String;

}


