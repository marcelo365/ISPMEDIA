import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Grupo } from '../models/Grupo';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Grupo`;
  private httpClient = inject(HttpClient);

  saveGrupo(grupo: Grupo) {
    return this.httpClient.post<Grupo>(`${this.baseUrl}/save`, grupo);
  }

  deleteGrupo(grupo: Grupo) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: grupo });
  }

  getAllGrupos() {
    return this.httpClient.get<Grupo[]>(`${this.baseUrl}/getAll`);
  }

  getGruposByNomeContendo(nome: string) {
    return this.httpClient.get<Grupo[]>(`${this.baseUrl}/getGruposByNomeContendo?nome=${nome}`);
  }

  getGruposByUtilizadorId(idUtilizador: number) {
    return this.httpClient.get<Grupo[]>(`${this.baseUrl}/getGruposByUtilizadorId?idUtilizador=${idUtilizador}`);
  }

  getGrupoById(id: number) {
    return this.httpClient.get<Grupo>(`${this.baseUrl}/getGrupoById?id=${id}`);
  }

}
