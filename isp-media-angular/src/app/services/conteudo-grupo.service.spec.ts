import { TestBed } from '@angular/core/testing';

import { ConteudoGrupoService } from './conteudo-grupo.service';

describe('ConteudoGrupoService', () => {
  let service: ConteudoGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConteudoGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
