import { inject, Injectable } from '@angular/core';
import { MusicaArtista } from '../models/MusicaArtista';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MusicaArtistaService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/MusicaArtista`;
  private httpClient = inject(HttpClient);

  saveMusicaArtista(musicaArtista: MusicaArtista) {
    return this.httpClient.post<MusicaArtista>(`${this.baseUrl}/save`, musicaArtista);
  }

  deleteMusicaArtista(musicaArtista: MusicaArtista) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: musicaArtista });
  }

  getAllMusicasArtistas() {
    return this.httpClient.get<MusicaArtista[]>(`${this.baseUrl}/getAll`);
  }

  getMusicasArtistasByMusicaId(idMusica: number) {
    return this.httpClient.get<MusicaArtista[]>(`${this.baseUrl}/getMusicasArtistasByMusicaId?idMusica=${idMusica}`);
  }

  getMusicasArtistasByArtistaId(idArtista: number) {
    return this.httpClient.get<MusicaArtista[]>(`${this.baseUrl}/getMusicasArtistasByArtistaId?idArtista=${idArtista}`);
  }

  getMusicaArtistaById(id: number) {
    return this.httpClient.get<MusicaArtista>(`${this.baseUrl}/getMusicaArtistaById?id=${id}`);
  }
}
