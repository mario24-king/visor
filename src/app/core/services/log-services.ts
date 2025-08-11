import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/log.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogServices {
  private apiUrl = 'http://localhost:8080/api/logs';

  constructor(private http: HttpClient) {}

  // Método para obtener los logs que viene del backend
  getLogs(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Método para Conectar buscador con backend
  getLogsBySearch(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/search?query=${query}`);
  }

};
