import { AppUser } from './appUser';

export interface Loan {
  id: number;
  amount: number;
  approved: boolean;
  loanType: String;
  user_id?: number;
  username: String;
}
