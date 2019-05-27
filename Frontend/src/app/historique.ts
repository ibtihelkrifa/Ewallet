import { PorteMonnaie } from "./porte-monnaie";

export class Historique {
    id:any
    date: Date
    num_transaction: any
    type_transaction: String
    statut: String
    porte_monnaie : PorteMonnaie
    somme: any
}
