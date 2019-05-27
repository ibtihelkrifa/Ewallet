import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PmService } from '../pm.service';
import { AuthService } from '../auth.service';
import { NotifService } from '../notif.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PorteMonnaie } from '../porte-monnaie';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.css']
})
export class ChargerComponent implements OnInit {
  id: any;
  user$: Observable<User>;
  closeResult: string;
  nbnotif$: Observable<number>;
  pm$: Observable<PorteMonnaie>;

  constructor(private ns:NotifService,private pms: PmService ,private modalService: NgbModal,private us:AuthService, private poms:PmService, private nos:NotifService,private Activatedroute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p => { this.id = p["id"] 
      this.nbnotif$=this.getnumbernotif(this.id);
      this.user$= this.getUser(this.id);
      this.pm$= this.getportemonnaie(this.id);    


    });

    })
    
   }

  ngOnInit() {
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

  onSubmit(f: NgForm,id:number) {


      console.log("hii cc ")
    this.us.getUserDetails(f.value.email).subscribe(user=>{
      this.poms.getportmonnaie(user.id).subscribe(pom=>{
       console.log("cc"+pom.numpm)

       console.log(f.value.num)
        if(pom.numpm===f.value.num)
        {
           this.nos.notifdemander(this.id,f.value.email,f.value.somme);
           f.reset();
           this.router.navigate(['/Charger/'+id])
            document.getElementById('message').innerHTML=""
  
        }
        else{
         document.getElementById('message').innerHTML="Veuillez Vérifier Les cordonnées du destinataire"        }

      })
      
    })
  
    }

  public getnumbernotif(id:number):Observable<number>
  {
  return  this.ns.getnbnotif(id);
  }
    getportemonnaie(id: any): Observable<PorteMonnaie>
    { 
     // localStorage.setItem('idpm',this.idpm.id);
  
      return this.pms.getportmonnaie(id);
      
    }
    getUser(id :any):Observable<User>
    {
     this.us.getUser(id).subscribe(user => {console.log(user.mail)})
     return this.us.getUser(id)
    }
  


}
