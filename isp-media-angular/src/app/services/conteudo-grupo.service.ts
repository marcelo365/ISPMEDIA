import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConteudoGrupo } from '../models/ConteudoGrupo';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ConteudoGrupoService {

  constructor() { }


  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/ConteudoGrupo`;
  private httpClient = inject(HttpClient);

  saveConteudoGrupo(conteudoGrupo: ConteudoGrupo) {
    return this.httpClient.post<ConteudoGrupo>(`${this.baseUrl}/save`, conteudoGrupo);
  }

  deleteConteudoGrupo(conteudoGrupo: ConteudoGrupo) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: conteudoGrupo });
  }

  getAllConteudosGrupos() {
    return this.httpClient.get<ConteudoGrupo[]>(`${this.baseUrl}/getAll`);
  }

  getConteudosGruposByGrupoId(idGrupo: number) {
    return this.httpClient.get<ConteudoGrupo[]>(`${this.baseUrl}/getConteudosGruposByGrupoId?idGrupo=${idGrupo}`);
  }

  getConteudosGruposByMusicaId(idMusica: number) {
    return this.httpClient.get<ConteudoGrupo[]>(`${this.baseUrl}/getConteudosGruposByMusicaId?idMusica=${idMusica}`);
  }

  getConteudosGruposByVideoId(idVideo: number) {
    return this.httpClient.get<ConteudoGrupo[]>(`${this.baseUrl}/getConteudosGruposByVideoId?idVideo=${idVideo}`);
  }

  getConteudosGruposByUtilizadorId(idUtilizador: number) {
    return this.httpClient.get<ConteudoGrupo[]>(`${this.baseUrl}/getConteudosGruposByUtilizadorId?idUtilizador=${idUtilizador}`);
  }

  getConteudoGrupoById(id: number) {
    return this.httpClient.get<ConteudoGrupo>(`${this.baseUrl}/getConteudoGrupoById?id=${id}`);
  }



}
