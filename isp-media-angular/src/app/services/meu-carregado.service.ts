import { inject, Injectable } from '@angular/core';
import { MeuCarregado } from '../models/MeuCarregado';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MeuCarregadoService {

  constructor() { }


  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/MeuCarregado`;
  private httpClient = inject(HttpClient);

  saveMeuCarregado(meuCarregado: MeuCarregado) {
    return this.httpClient.post<MeuCarregado>(`${this.baseUrl}/save`, meuCarregado);
  }

  deleteMeuCarregado(meuCarregado: MeuCarregado) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: meuCarregado });
  }

  getAllMeusCarregados() {
    return this.httpClient.get<MeuCarregado[]>(`${this.baseUrl}/getAll`);
  }

  getMeusCarregadosByUtilizadorId(idUtilizador: number) {
    return this.httpClient.get<MeuCarregado[]>(`${this.baseUrl}/getMeusCarregadosByUtilizadorId?idUtilizador=${idUtilizador}`);
  }

  getMeusCarregadosByMusicaId(idMusica: number) {
    return this.httpClient.get<MeuCarregado[]>(`${this.baseUrl}/getMeusCarregadosByMusicaId?idMusica=${idMusica}`);
  }

  getMeusCarregadosByVideoId(idVideo: number) {
    return this.httpClient.get<MeuCarregado[]>(`${this.baseUrl}/getMeusCarregadosByVideoId?idVideo=${idVideo}`);
  }

  getMeusCarregadosByVinculoDireto(vinculoDireto: boolean) {
    return this.httpClient.get<MeuCarregado[]>(`${this.baseUrl}/getMeusCarregadosByVinculoDireto?vinculoDireto=${vinculoDireto}`);
  }

  getMeuCarregadoById(id: number) {
    return this.httpClient.get<MeuCarregado>(`${this.baseUrl}/getMeuCarregadoById?id=${id}`);
  }
}
