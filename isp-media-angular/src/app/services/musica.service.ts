import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Musica } from '../models/Musica';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  constructor() { }


  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Musica`;
  private httpClient = inject(HttpClient);

  createMusica(musica: Musica) {
    return this.httpClient.post<Musica>(`${this.baseUrl}/save`, musica);
  }

  deleteMusica(musica: Musica) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: musica });
  }

  getAllMusicas() {
    return this.httpClient.get<Musica[]>(`${this.baseUrl}/getAll`);
  }

  getMusicasByTituloContendo(titulo: string) {
    return this.httpClient.get<Musica[]>(`${this.baseUrl}/getMusicasByTituloContendo?titulo=${titulo}`);
  }

  getMusicasByAlbumId(idAlbum: number) {
    return this.httpClient.get<Musica[]>(`${this.baseUrl}/getMusicasByAlbumId?idAlbum=${idAlbum}`);
  }

  getMusicasByCategoriaId(idCategoria: number) {
    return this.httpClient.get<Musica[]>(`${this.baseUrl}/getMusicasByCategoriaId?idCategoria=${idCategoria}`);
  }

  getMusicaById(id: number) {
    return this.httpClient.get<Musica>(`${this.baseUrl}/getMusicaById?id=${id}`);
  }

}
