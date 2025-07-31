import { TestBed } from '@angular/core/testing';

import { MeuCarregadoService } from './meu-carregado.service';

describe('MeuCarregadoService', () => {
  let service: MeuCarregadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeuCarregadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
