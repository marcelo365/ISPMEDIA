import { TestBed } from '@angular/core/testing';

import { FicheiroServiceService } from './ficheiro-service.service';

describe('FicheiroServiceService', () => {
  let service: FicheiroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FicheiroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
