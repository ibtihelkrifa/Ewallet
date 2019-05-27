import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PmService } from '../pm.service';
import { NotifService } from '../notif.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notification } from '../notification';
import { Observable } from 'rxjs';
import { User } from '../user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PorteMonnaie } from '../porte-monnaie';


@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {
  id: any;
  closeResult: string;

  notification:Notification
  user$: Observable<User>;
  nbnotif$: Observable<number>;
  pm$: Observable<any>;
  constructor(private pms: PmService ,private ns:NotifService,private modalService: NgbModal,private Auth: AuthService ,private us:AuthService, private poms:PmService, private nos:NotifService,private Activatedroute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p => { this.id = p["id"] 
      this.nbnotif$=this.getnumbernotif(this.id);
      this.pm$=this.getportemonnaie(this.id)

      this.user$= this.getUser(this.id);

    });

    })
    
   }

  ngOnInit() {
  }
  getportemonnaie(id: any): Observable<PorteMonnaie>
  { 
   // localStorage.setItem('idpm',this.idpm.id);

    return this.pms.getportmonnaie(id);
    
  }

  onSubmit(f: NgForm,id:number) {

  this.us.getUserDetails(f.value.email).subscribe(user=>{
    this.poms.getportmonnaie(user.id).subscribe(pom=>{
      console.log(this.poms)
      console.log(parseFloat(f.value.num))
      if(pom.numpm==parseFloat(f.value.num) && pom.solde>parseFloat(f.value.somme))
      {  
         this.nos.envoyernotif(this.id,f.value.email,f.value.somme);
         document.getElementById('message').innerHTML = ' '

         f.reset();

         this.router.navigate(['/SendMoney/'+id])


      }
      else if( pom.solde<parseFloat(f.value.somme))
      {
        document.getElementById('message').innerHTML = 'vous n\'avez pas assez de monnaie à envoyer '
        f.reset()

      }
      else
      {
        document.getElementById('message').innerHTML = 'Veuillez verifier vos coordonnées bancaires '
        f.reset()

      }
    })
    
  })

  }

  public getnumbernotif(id:number):Observable<number>
  {
  return  this.ns.getnbnotif(id);
  }
  getUser(id: any): Observable<User> {
    this.Auth.getUser(id).subscribe(user => { console.log(user.mail) })
    return this.Auth.getUser(id)
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
