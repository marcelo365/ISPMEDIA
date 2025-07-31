import { inject, Injectable } from '@angular/core';
import { MembroGrupo } from '../models/MembroGrupo';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class MembroGrupoService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/MembroGrupo`;
  private httpClient = inject(HttpClient);

  saveMembroGrupo(membroGrupo: MembroGrupo) {
    return this.httpClient.post<MembroGrupo>(`${this.baseUrl}/save`, membroGrupo);
  }

  deleteMembroGrupo(membroGrupo: MembroGrupo) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: membroGrupo });
  }

  getAllMembrosGrupo() {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getAll`);
  }

  getMembrosGrupoByUtilizadorId(idUtilizador: number) {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByUtilizadorId?idUtilizador=${idUtilizador}`);
  }

  getMembrosGrupoByGrupoId(idGrupo: number) {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByGrupoId?idGrupo=${idGrupo}`);
  }

  getMembrosGrupoByPapel(papel: number) {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByPapel?papel=${papel}`);
  }

  getMembrosGrupoByEstado(estado: number) {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByEstado?estado=${estado}`);
  }

  getMembrosGrupoByEstadoAndUtilizadorId(estado: number, idUtilizador: number) {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByEstadoAndUtilizadorId?estado=${estado}&idUtilizador=${idUtilizador}`);
  }

  getMembroGrupoById(id: number) {
    return this.httpClient.get<MembroGrupo>(`${this.baseUrl}/getMembroGrupoById?id=${id}`);
  }


}
