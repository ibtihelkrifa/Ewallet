import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {

    this.Auth.getUserDetails(f.value.username).subscribe(user => {
 
      if(user!=null)
      {
      if (user.mot_de_passe == f.value.password) {
      
        this.router.navigate(['/Admin'+'/'+user.id]);
      }
      else {
        document.getElementById('alert').innerHTML="verifier votre mot de passe"
        this.router.navigate(['/'])
      }
      }
      else
      {
        document.getElementById('alert').innerHTML="verifier votre adresse mail"

      }



    })
  }
}