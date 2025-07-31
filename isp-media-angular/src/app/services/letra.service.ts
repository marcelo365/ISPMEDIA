import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class LetraService {

  constructor() { }


  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080`;
  private http = inject(HttpClient);


  carregarLetra(caminhoLetra: string) {
    return this.http.get(`${this.baseUrl}${caminhoLetra}`, {
      responseType: 'text',
    });
  }

}
