import { PorteMonnaie } from "./porte-monnaie";

export class Transaction {
    id:any
    devise:String
    somme:any
    statut:any
    type:any
    date:any
    sourcedebitante:PorteMonnaie
    sourcecreditante:PorteMonnaie

}
