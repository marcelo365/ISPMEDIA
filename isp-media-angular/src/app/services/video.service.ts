import { inject, Injectable } from '@angular/core';
import { Video } from '../models/Video';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Video`;
  private httpClient = inject(HttpClient);

  saveVideo(video: Video) {
    return this.httpClient.post<Video>(`${this.baseUrl}/save`, video);
  }

  deleteVideo(video: Video) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: video });
  }

  getAllVideos() {
    return this.httpClient.get<Video[]>(`${this.baseUrl}/getAll`);
  }

  getVideosByTituloContendo(titulo: string) {
    return this.httpClient.get<Video[]>(`${this.baseUrl}/getVideosByTituloContendo?titulo=${titulo}`);
  }

  getVideosByCategoriaId(idCategoria: number) {
    return this.httpClient.get<Video[]>(`${this.baseUrl}/getVideosByCategoriaId?idCategoria=${idCategoria}`);
  }

  getVideosByMusicaId(idMusica: number) {
    return this.httpClient.get<Video[]>(`${this.baseUrl}/getVideosByMusicaId?idMusica=${idMusica}`);
  }

  getVideoById(id: number) {
    return this.httpClient.get<Video>(`${this.baseUrl}/getVideoById?id=${id}`);
  }


}
