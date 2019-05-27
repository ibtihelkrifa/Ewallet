import {User } from './user';
export class Notification {
    id:any
    datenotif: Date
    type :String
    statut:String
    receiver: User
    expediteur:User
    somme:any
    fini:Boolean
    datelimite:Date

}
