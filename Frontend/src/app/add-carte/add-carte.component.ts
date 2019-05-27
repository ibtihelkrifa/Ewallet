import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organisation } from '../organisation';
import { OrganisationService } from '../organisation.service';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { PorteMonnaie } from '../porte-monnaie';
import { PmService } from '../pm.service';
import { CarteService } from '../carte.service';
import { CompteBancaire } from '../compte-bancaire';
import * as $ from 'jquery';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotifService } from '../notif.service';
@Component({
  selector: 'app-add-carte',
  templateUrl: './add-carte.component.html',
  styleUrls: ['./add-carte.component.css']
})
export class AddCarteComponent implements OnInit {
  id: any
  organisations$: any
  rib: string
  x: any
  result: String[]
  org$: any
  isNumber: any
  user$: any
  mail: any
  bnkidentifier: any
  identifier: any
  portmonnaie$: any
  comptebnk$: any;
  c: CompteBancaire
  cmp$: any
  closeResult: string;
  pm$: Observable<PorteMonnaie>;
  nbnotif$: Observable<number>;

  constructor(private ns:NotifService,private modalService: NgbModal,private cs: CarteService, private pms: PmService, private Auth: AuthService, private Activatedroute: ActivatedRoute, private router: Router, private orgs: OrganisationService) {

    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p => { this.id = p["id"] 
      this.pm$= this.getportemonnaie(this.id);    
      this.user$= this.getUser(this.id);
      this.nbnotif$=this.getnumbernotif(this.id);


    });
      this.organisations$ = this.getorganisation();

    })
  }

  ngOnInit() {
  }

  public getnumbernotif(id:number):Observable<number>
  {
  return  this.ns.getnbnotif(id);
  }


  getorganisation(): Observable<Organisation[]> {
    return this.orgs.getorganisation();
  }
  onSubmit(f: NgForm) {
    console.log(f.value)
    this.mail = f.value.email
    this.rib = f.value.rib
    this.isNumber = (f.value.rib).substring(3, 24);
    
    if (this.rib.length == 24) {
    this.org$ = this.orgs.getdetail(f.value.organisation);
      this.org$.subscribe(data => {
        if (data.countryidentifier.charAt(0) == (f.value.rib).charAt(0) && data.countryidentifier.charAt(1) == (f.value.rib).charAt(1)) {
          this.identifier = data.bankidentifier
          

          if (isNaN(this.isNumber)) {
          }
          else {
            this.user$ = this.getUser(this.id).subscribe(user => {
              if (user.mail == this.mail) {

                this.bnkidentifier = this.isNumber.substring(1, 3)
                if (this.bnkidentifier == this.identifier) {
                  this.portmonnaie$ = this.getportemonnaie(user.id)

                this.portmonnaie$.subscribe(porm=>{
                  this.comptebnk$ = this.cs.save(f.value,porm)
                  f.reset();
                  this.router.navigate(['/AddCarte/'+user.id])
                    

                }) 
                
  
                }
                else {
                  console.log('mech nafs el bnk identifier')
                }

              }
              else {
                document.getElementById('alert').innerHTML="verifier votre adresse mail"
              }
            })
          }

        }

      })

      
    }
    else 
    {
      console.log("infegale a 24")
    }
  }



  getUser(id: any): Observable<User> {
    this.Auth.getUser(id).subscribe(user => { console.log(user.mail) })
    return this.Auth.getUser(id)
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

 

}
