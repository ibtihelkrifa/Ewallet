import { Injectable } from '@angular/core';
import {Notification} from './notification'
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotifService {
  private url="http://localhost:8080/notif/";

  constructor(private us:AuthService,private http: HttpClient) { 
 

  }


  envoyernotif(idexp : any, mail:any,som:any)
  { 
   let not= new  Notification()

    this.us.getUser(idexp).subscribe(user=>{

      this.us.getUserDetails(mail).subscribe(u=>{
      not.receiver=u
      not.somme=som
      not.datenotif= new Date();
      not.expediteur=user
      not.type="versement"
      not.fini=true
      const notif = JSON.stringify(not);

      this.http.post<Notification>(this.url+'create', notif, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(response => { console.log(response) });
      })
    })
  }
  notifdemander(idexp : any, mail:any,som:any)
  {
    let not= new  Notification()

    this.us.getUser(idexp).subscribe(user=>{

      this.us.getUserDetails(mail).subscribe(u=>{
      not.receiver=u
      not.somme=som
      not.datenotif= new Date();
      not.expediteur=user
      not.type="Demande de Retrait"
      not.fini=true
      const notif = JSON.stringify(not);
       
      this.http.post<Notification>(this.url+'create', notif, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(response => { console.log(response) });
      })
    })
  }
  getnbnotif(id:any):Observable<number>
  {
  return this.http.get<number>('http://localhost:8080/notif/'+id);

  }


  getnotifs(id:any) : Observable<Notification[]>
  {
    return this.http.get<Notification[]>('http://localhost:8080/notifs/'+id)
  }
  getnotifsdemande(id:any):Observable<Notification[]>
  {
    
      return this.http.get<Notification[]>('http://localhost:8080/notifsdemande/'+id)
    
  }

  recupmonnotif(id:any):Observable<Notification[]>
  {
    return this.http.get<Notification[]>('http://localhost:8080/notifmoney/'+id)
  }






  supprimernotif( n:Notification)
  {
    let not = JSON.stringify(n)
    this.http.post<Notification>('http://localhost:8080/notif/delete', not, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => { console.log(response) });;  }

  
    recup( n:Notification)
    {
      console.log("i am here")
      let not = JSON.stringify(n)
      this.http.post<Notification>('http://localhost:8080/notif/recup', not, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(response => { console.log(response) });; ;; 

    }


    annulernotif(n:Notification)
    {
      let not = JSON.stringify(n)
      this.http.post<Notification>('http://localhost:8080/notif/annuler', not, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(response => { console.log(response) });;  }
   
   
   
   
    }





