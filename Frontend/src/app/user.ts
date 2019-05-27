import {PorteMonnaie } from './porte-monnaie';
import {Notification} from './notification';
export class User {
      id:any;
      mail : any
     nom: any
     prenom :any
     mot_de_passe :any
     notifications :Notification[]
     porte_monnaies: PorteMonnaie[]


}
