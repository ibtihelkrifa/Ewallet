import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifService } from '../notif.service';
import { Observable } from 'rxjs';
import { Notification } from '../notification';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { PmService } from '../pm.service';
import { PorteMonnaie } from '../porte-monnaie';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recuperer',
  templateUrl: './recuperer.component.html',
  styleUrls: ['./recuperer.component.css']
})
export class RecupererComponent implements OnInit {
  recupmoney$:any
  id: any;
  user$: Observable<any>;
  closeResult: string;
  pm$: Observable<PorteMonnaie>;
  nbnotif$: Observable<number>;
  constructor( private modalService: NgbModal,private pms: PmService ,private us:AuthService,private ns:NotifService,  private router: Router,private Activatedroute: ActivatedRoute) {

    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p => { this.id = p["id"] 
      this.recupmoney$=this.recupmoneynotif(this.id);
      this.user$= this.getUser(this.id);
      this.pm$= this.getportemonnaie(this.id);    
      this.nbnotif$=this.getnumbernotif(this.id);



    });

    })

   }

  ngOnInit() {
  }

  public getnumbernotif(id:number):Observable<number>
  {
  return  this.ns.getnbnotif(id);
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

  getportemonnaie(id: any): Observable<PorteMonnaie>
  { 
   // localStorage.setItem('idpm',this.idpm.id);

    return this.pms.getportmonnaie(id);
    
  }
  recupmoneynotif(id:any):Observable<Notification[]>
  {
    return this.ns.recupmonnotif(id);
  }
  


  Recuperer( n:Notification,id:any)
  {
    this.ns.recup(n)
    this.router.navigate(['/recuperer/'+id])
    
  }
  getUser(id :any):Observable<User>
    {
     this.us.getUser(id).subscribe(user => {console.log(user.mail)})
     return this.us.getUser(id)
    }
  

}
