import { TestBed } from '@angular/core/testing';

import { RadioEstacaoService } from './radio-estacao.service';

describe('RadioEstacaoService', () => {
  let service: RadioEstacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadioEstacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
