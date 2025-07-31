import { inject, Injectable } from '@angular/core';
import { SharedDataService } from './shared-data.service';
import { HttpClient } from '@angular/common/http';
import { Notificacao } from '../models/Notificacao';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Notificacao`;
  private httpClient = inject(HttpClient);

  //Buscar notificações não lidas
  getNotificacoesNaoLidas(idUtilizador: number) {
    return this.httpClient.post<Notificacao[]>(`${this.baseUrl}/getNotificacoesNaoLidas`, {
      id: idUtilizador
    });
  }

  // Marcar notificações como lidas
  marcarNotificacoesComoLidas(notificacoes: Notificacao[]) {
    return this.httpClient.post<void>(`${this.baseUrl}/marcarNotificacoesComoLidas`, notificacoes);
  }

  //Criar uma nova notificação
  criarNotificacao(mensagem: string, idUtilizador: number) {
    return this.httpClient.post<void>(
      `${this.baseUrl}/criarNotificacao?mensagem=${encodeURIComponent(mensagem)}`,
      { id: idUtilizador }
    );
  }

}
