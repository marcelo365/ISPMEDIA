import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PlaylistMusica } from '../models/PlaylistMusica';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistMusicaService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/PlaylistMusica`;
  private httpClient = inject(HttpClient);

  createPlaylistMusica(playlistMusica: PlaylistMusica) {
    return this.httpClient.post<PlaylistMusica>(`${this.baseUrl}/save`, playlistMusica);
  }

  deletePlaylistMusica(playlistMusica: PlaylistMusica) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: playlistMusica });
  }

  getAllPlaylistMusicas() {
    return this.httpClient.get<PlaylistMusica[]>(`${this.baseUrl}/getAll`);
  }

  getPlaylistMusicasByPlaylistId(idPlaylist: number) {
    return this.httpClient.get<PlaylistMusica[]>(`${this.baseUrl}/getPlaylistMusicasByPlaylistId?idPlaylist=${idPlaylist}`);
  }

  getPlaylistMusicasByMusicaId(idMusica: number) {
    return this.httpClient.get<PlaylistMusica[]>(`${this.baseUrl}/getPlaylistMusicasByMusicaId?idMusica=${idMusica}`);
  }

  getPlaylistMusicaById(id: number) {
    return this.httpClient.get<PlaylistMusica>(`${this.baseUrl}/getPlaylistMusicaById?id=${id}`);
  }

}
