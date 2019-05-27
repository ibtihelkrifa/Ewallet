import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { PorteMonnaie } from '../porte-monnaie';
import { PmService } from '../pm.service';
import { Historique } from '../historique';
import { HistoriqueService } from '../historique.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifService } from '../notif.service';
import { Transaction } from '../transaction';
import { CompteBancaire } from '../compte-bancaire';
import { CarteService } from '../carte.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
   id: any
   user$: any
   pm$: any
   historiques$:any
   closeResult: string;
   nbnotif$:any
   listbnk$:any
  constructor(private cs: CarteService,private ns:NotifService, private modalService: NgbModal,private hs:HistoriqueService,private pms: PmService ,private Auth: AuthService ,  private router: Router,private Activatedroute: ActivatedRoute) { 

    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p=>{this.id=p["id"]
      this.nbnotif$=this.getnumbernotif(this.id);
      this.listbnk$=this.getlistbnk(this.id)
      this.historiques$=this.gethistoriques(this.id);
   

    }
    
    
    );
      this.user$= this.getUser(this.id);
     this.pm$= this.getportemonnaie(this.id);    
    })

     // this.historiques$=this.gethistoriques();
  }

  ngOnInit() {
  }
   

  getportemonnaie(id: any): Observable<PorteMonnaie>
  { 
   // localStorage.setItem('idpm',this.idpm.id);

    return this.pms.getportmonnaie(id);
    
  }

  getUser(id :any):Observable<User>
  {
   this.Auth.getUser(id).subscribe(user => {console.log(user.mail)})
   return this.Auth.getUser(id)
  }



  gethistoriques(id:any):Observable<Transaction[]>
  {
    return this.hs.getlisthistoriques(id);
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


  public getnumbernotif(id:number):Observable<number>
  {
  return  this.ns.getnbnotif(id);
  }

  getlistbnk(id: any): Observable<CompteBancaire[]> {
    this.getportemonnaie(id).subscribe(pom => {
      localStorage.setItem('idpm', pom.id)
    })
    let idpm = localStorage.getItem('idpm');

    return this.cs.getlistbnk(idpm)

  }
  

  onSubmit(f: NgForm) {
  
   let a= parseFloat(f.value.prix)
   if(a<=0)
   {
    document.getElementById('message').innerHTML="La Somme à décharger doit être >=0"
   }
    else
    {

      this.cs.decharger(f.value)
      this.router.navigate(['Admin/'+this.id])
      document.getElementById('message').innerHTML=""

    }
  }
  

}
