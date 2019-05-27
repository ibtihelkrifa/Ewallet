import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PorteMonnaie } from './porte-monnaie';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class PmService {

  constructor(private http: HttpClient) { }

   private url="http://localhost:8080/pm/";


   updatepom(portem:any)
   {
const pom = JSON.stringify(portem);

this.http.post<PorteMonnaie>(this.url+'/update', portem, {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}).subscribe(response => { console.log(response) });

   }
  getportmonnaie(id : number) : Observable<PorteMonnaie>
  {

  return this.http.get<PorteMonnaie>(this.url+id);
  }
}
