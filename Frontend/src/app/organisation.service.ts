import { Injectable } from '@angular/core';
import { Organisation } from './organisation';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private postUrl = 'http://localhost:8080/organisation/';  // URL to web api

  constructor(private http: HttpClient) { }


  getorganisation():Observable<Organisation[]>
  {
    this.http.get<Organisation[]>(this.postUrl).subscribe(response=>{console.log(response)});
    return  this.http.get<Organisation[]>(this.postUrl);
  }
  getdetail(org:string):Observable<Organisation>
  {
    return  this.http.get<Organisation>(this.postUrl+org);
  }


}
