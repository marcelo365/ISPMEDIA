import { inject, Injectable } from '@angular/core';
import { Notificacao } from '../models/Notificacao';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})

export class WebSocketNotificacaoService {


  private stompClient!: Client;
  sharedDataService = inject(SharedDataService);

  conectar(idUtilizador: number, onMensagem: (n: Notificacao) => void): void {
    const socket = new SockJS(`http://${this.sharedDataService.ipServidor}:8080/ws`);

    this.stompClient = new Client({

      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        this.stompClient.subscribe(`/topico/notificacao/${idUtilizador}`, (mensagem: IMessage) => {
          const notificacao: Notificacao = JSON.parse(mensagem.body);
          onMensagem(notificacao);
        });
      },

      onStompError: (error) => {
        console.error('Erro STOMP:', error);
      }
    });

    this.stompClient.activate(); // inicia a conexão
  }

  desconectar(): void {
    this.stompClient?.deactivate();
  }


}
