import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Estacao } from '../models/Estacao';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  private apiUrl = 'https://de1.api.radio-browser.info/json/stations';

  constructor(private http: HttpClient) { }

  buscarPorPais(pais: string): Observable<Estacao[]> {
    return this.http.get<Estacao[]>(`${this.apiUrl}/bycountry/${encodeURIComponent(pais)}`)
      .pipe(
        map(estacoes => estacoes.slice(0, 10)) // pega só as 10 primeiras
      );
  }

  listarPaises(): Observable<string[]> {
    return this.http.get<any[]>('https://de1.api.radio-browser.info/json/countries')
      .pipe(map(paises => paises.map(p => p.name))); // extrai apenas o nome
  }

}
