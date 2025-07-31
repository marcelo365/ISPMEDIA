import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Utilizador } from '../models/Utilizador';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Utilizador`;
  private httpClient = inject(HttpClient);

  createUtilizador(utilizador: Utilizador) {
    return this.httpClient.post<Utilizador>(`${this.baseUrl}/save`, utilizador);
  }

  getUtilizadorByUserName(username: string) {
    return this.httpClient.get<Utilizador>(`${this.baseUrl}/getUtilizadorByUsername?username=${username}`);
  }

  getUtilizadorByEmail(email: string) {
    return this.httpClient.get<Utilizador>(`${this.baseUrl}/getUtilizadorByEmail?email=${email}`);
  }

  getUtilizadorByUserNameAndSenha(username: string, senha: string) {
    return this.httpClient.get<Utilizador>(`${this.baseUrl}/getUtilizadorByUsernameAndSenha?username=${username}&senha=${senha}`);
  }

  getAllUtilizadores() {
    return this.httpClient.get<Utilizador[]>(`${this.baseUrl}/getAll`);
  }


}
