import { TestBed } from '@angular/core/testing';

import { WebSocketNotificacaoService } from './web-socket-notificacao.service';

describe('WebSocketNotificacaoService', () => {
  let service: WebSocketNotificacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketNotificacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
