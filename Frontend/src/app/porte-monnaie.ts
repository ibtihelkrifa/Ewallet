import {CompteBancaire} from './compte-bancaire'
import{Historique} from './historique';
import { User } from './user';
import { Transaction } from './transaction';
export class PorteMonnaie {
    id: any
  numpm : any
  solde : any
  devise: any
  user: User
  transaction_debitantes: Transaction[]
  transaction_creditantes: Transaction[]
    compte_bancaires: CompteBancaire[]
    historiques: Historique[]
    
   
}
