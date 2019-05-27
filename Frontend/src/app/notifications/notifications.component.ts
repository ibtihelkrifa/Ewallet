import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifService } from '../notif.service';
import { Observable } from 'rxjs';
import { Notification } from '../notification';
import { PorteMonnaie } from '../porte-monnaie';
import { PmService } from '../pm.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  id: any;
   notif$:any
   notifdemande$:any
   closeResult: string;

  pom$: Observable<PorteMonnaie>;
  user$: Observable<any>;
  constructor(private Auth: AuthService , private modalService: NgbModal,private pms:PmService ,private ns:NotifService,  private router: Router,private Activatedroute: ActivatedRoute) {
    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p => { this.id = p["id"] 
      this.user$= this.getUser(this.id);
      this.notif$=this.getallnotif(this.id);
      this.notif$.subscribe(not=>{
        console.log(not)
      })
      this.notifdemande$=this.getnotifsdedemande(this.id);
      this.notifdemande$.subscribe(not=>{
       console.log("hi")
        console.log(not)
      })
      this.pom$=this.getportemonnaie(this.id);
    });

    })
   }

  ngOnInit() {
  }


getallnotif(id:any):Observable<Notification[]>
{
return this.ns.getnotifs(id); 

}
getnotifsdedemande(id:any):Observable<Notification[]>
{
  return this.ns.getnotifsdemande(id); 

}

confirmer(n:Notification,id:any)
{
console.log(n)
this.pom$.subscribe(pom=>{
  if(pom.solde>n.somme)
  {
    document.getElementById('message').innerHTML = ' '

    this.ns.supprimernotif(n);
    this.router.navigate(['/Notification/'+id])

  }
  else 
  {
    document.getElementById('message').innerHTML = 'vous n\'avez pas assez de monnaie à envoyer '
    this.router.navigate(['/Notification/'+id])

  }
})


}

Annuler(n:Notification,id:any)
{
  this.ns.annulernotif(n)
  this.router.navigate(['/Notification/'+id])

}

getportemonnaie(id: any): Observable<PorteMonnaie>
  { 
   // localStorage.setItem('idpm',this.idpm.id);

    return this.pms.getportmonnaie(id);
    
  }


  getUser(id: any): Observable<User> {
    this.Auth.getUser(id).subscribe(user => { console.log(user.mail) })
    return this.Auth.getUser(id)
  }

  
}
