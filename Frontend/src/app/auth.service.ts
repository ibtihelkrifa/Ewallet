import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {User } from '../app/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private postUrl = 'http://localhost:8080/user/';  // URL to web api

  u:User;
  constructor(private http: HttpClient) { }
  
  
  
  getUserDetails(username:String):Observable<User>
  {
    this.http.get<User>(this.postUrl+username).subscribe(response=>{console.log(response)});
    return  this.http.get<User>(this.postUrl+username)
  }

inscrire(user: any): Observable<User>
 {


  return this.http.post<User>(this.postUrl  , JSON.stringify(user) ,   {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  } );

}

getUser( id : number): Observable<User>
{ this.http.get<User>("http://localhost:8080/thisuser/"+id).subscribe(response=>{console.log(response)})
  return this.http.get<User>("http://localhost:8080/thisuser/"+id);
}



}