import { TestBed } from '@angular/core/testing';

import { MembroGrupoService } from './membro-grupo.service';

describe('MembroGrupoService', () => {
  let service: MembroGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembroGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
