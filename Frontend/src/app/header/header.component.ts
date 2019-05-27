import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NotifService } from '../notif.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router, ActivatedRoute } from '@angular/router';
import { PorteMonnaie } from '../porte-monnaie';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  closeResult: string;
  id: any;
  nbnotif$: Observable<number>;
  user$: Observable<User>;
  pm$: Observable<any>;

  constructor(private pms: PmService ,private Auth: AuthService , private ns:NotifService, private modalService: NgbModal ,private router: Router,private Activatedroute: ActivatedRoute) {

    this.router.events.subscribe(path => {
      this.Activatedroute.params.subscribe(p=>{this.id=p["id"]
      this.nbnotif$=this.getnumbernotif(this.id);
      this.user$= this.getUser(this.id);
      this.pm$= this.getportemonnaie(this.id);   
    
    }
    
    
    )
   }
  )}
  ngOnInit() {
  }

  getportemonnaie(id: any): Observable<PorteMonnaie>
  { 
   // localStorage.setItem('idpm',this.idpm.id);

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


  public getnumbernotif(id:number):Observable<number>
  {
  return  this.ns.getnbnotif(id);
  }
  getUser(id :any):Observable<User>
  {
   this.Auth.getUser(id).subscribe(user => {console.log(user.mail)})
   return this.Auth.getUser(id)
  }

}
