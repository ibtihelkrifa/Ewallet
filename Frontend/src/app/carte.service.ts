import { Injectable } from '@angular/core';
import { CompteBancaire } from './compte-bancaire';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PorteMonnaie } from './porte-monnaie';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  private postUrl = 'http://localhost:8080/compte/';  // URL to web api
  pom$: any
  pmid: any;
  pm: string;

  constructor(private http: HttpClient) { }


  save(cmptbnk: CompteBancaire, pm: PorteMonnaie): Observable<CompteBancaire> {
    cmptbnk.porte_monnaies = pm
    const bnk = JSON.stringify(cmptbnk);


    this.http.post<CompteBancaire>(this.postUrl, bnk, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => { console.log(response) });

    return this.http.post<CompteBancaire>(this.postUrl, bnk, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  getlistbnk(pmid: any): Observable<CompteBancaire[]> {

    return this.http.get<CompteBancaire[]>('http://localhost:8080/comptes/' + pmid);

  }
  updatecompte(compte: CompteBancaire) {
    const cmpt = JSON.stringify(compte);
    console.log(cmpt)
    this.http.post<CompteBancaire>(this.postUrl+'/update', cmpt, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => { console.log(response) });
  }



  decharger(f:CompteBancaire)
  {
    console.log(f);
    const cmpt = JSON.stringify(f);

    this.http.post<CompteBancaire>(this.postUrl+'/decharger', cmpt, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => { console.log(response) });
  }
}
