import { TestBed } from '@angular/core/testing';

import { MusicaArtistaService } from './musica-artista.service';

describe('MusicaArtistaService', () => {
  let service: MusicaArtistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicaArtistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
