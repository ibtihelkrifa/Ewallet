import { Injectable } from '@angular/core';
import { Historique } from './historique';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  constructor(private http: HttpClient) { }
  getlisthistoriques(id:number): Observable<Transaction[]> {

    return this.http.get<Transaction[]>('http://localhost:8080/historiques/'+id);

  }
}
