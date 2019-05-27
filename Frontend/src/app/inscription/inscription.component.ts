import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  u$: any
  user :User
  msg: String
  constructor(private Auth: AuthService,private router: Router) {
    this.msg=null;
   }
   
  ngOnInit() {
  }
  onSubmit(f2: NgForm)
  {
    this.u$=this.Auth.inscrire(f2.value);
    console.log("hi")
     this.u$.subscribe(user=>{ console.log(user)
    
      if(user.id!=null)
      {
 
       this.router.navigate(['/']);
     } 
      else
      {
       this.router.navigate(['/Inscription'])
       document.getElementById('message').innerHTML = 'L\'adresse Mail est deja utilisé '
      } 
    
    
    })
    

  }

}
