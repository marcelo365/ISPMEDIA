import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RadioEstacao } from '../models/RadioEstacao';
import { Observable } from 'rxjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class RadioEstacaoService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/RadioEstacao`;
  private httpClient = inject(HttpClient);

  createRadioEstacao(radioEstacao: RadioEstacao) {
    return this.httpClient.post<RadioEstacao>(`${this.baseUrl}/save`, radioEstacao);
  }

  deleteRadioEstacao(radioEstacao: RadioEstacao) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: radioEstacao });
  }

  getAllRadioEstacoes() {
    return this.httpClient.get<RadioEstacao[]>(`${this.baseUrl}/getAll`);
  }

  getRadioEstacoesByNomeContendo(nome: string) {
    return this.httpClient.get<RadioEstacao[]>(`${this.baseUrl}/getRadioEstacoesByNomeContendo?nome=${nome}`);
  }

  getRadioEstacaoById(id: number) {
    return this.httpClient.get<RadioEstacao>(`${this.baseUrl}/getRadioEstacaoById?id=${id}`);
  }


}
