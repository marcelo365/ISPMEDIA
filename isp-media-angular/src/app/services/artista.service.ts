import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Artista } from '../models/Artista';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Artista`;
  private httpClient = inject(HttpClient);

  createArtista(artista: Artista) {
    return this.httpClient.post<Artista>(`${this.baseUrl}/save`, artista);
  }

  deleteArtista(artista: Artista) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, {
      body: artista
    });
  }

  getAllArtistas() {
    return this.httpClient.get<Artista[]>(`${this.baseUrl}/getAll`);
  }

  getArtistasByNomeContendo(nome: string) {
    return this.httpClient.get<Artista[]>(`${this.baseUrl}/getArtistasByNomeContendo?nome=${nome}`);
  }

  getArtistaById(id: number) {
    return this.httpClient.get<Artista>(`${this.baseUrl}/getArtistaById?id=${id}`);
  }

}
