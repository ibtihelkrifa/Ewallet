import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarteService } from '../carte.service';
import { Observable } from 'rxjs';
import { CompteBancaire } from '../compte-bancaire';
import { PmService } from '../pm.service';
import { PorteMonnaie } from '../porte-monnaie';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { NotifService } from '../notif.service';


@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {
  id: any
  comptes$: any;
  idpm: any
  closeResult: string;
  user$: Observable<User>;
  pm$: Observable<PorteMonnaie>;
  nbnotif$: Observable<number>;
  constructor(private ns:NotifService,private us:AuthService,private modalService: NgbModal, private pms: PmService, private cs: CarteService, private Activatedroute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p => { this.id = p["id"] 
     this.pm$=this.getportemonnaie(this.id)
      this.comptes$ = this.getlistbnk(this.id);
      this.user$= this.getUser(this.id);     
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
  getlistbnk(id: any): Observable<CompteBancaire[]> {
    this.getportemonnaie(id).subscribe(pom => {
      localStorage.setItem('idpm', pom.id)
    })
    let idpm = localStorage.getItem('idpm');

    return this.cs.getlistbnk(idpm)



  }

  getportemonnaie(id: any): Observable<PorteMonnaie> {
    return this.pms.getportmonnaie(id);

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


  onSubmit(f: NgForm, compte:   CompteBancaire) {

    console.log("hi"+compte)
    console.log(f.value.prix+"hi")
    if (f.value.prix <= compte.solde) {
      compte.solde = (compte.solde) - f.value.prix
      this.pms.getportmonnaie(this.id).subscribe(portem => {
        portem.solde = (portem.solde) + parseFloat(f.value.prix)

        this.pms.updatepom(portem);
      })

      this.cs.updatecompte(compte)

    }
  }
  getUser(id :any):Observable<User>
  {
   this.us.getUser(id).subscribe(user => {console.log(user.mail)})
   return this.us.getUser(id)
  }


}
