import { TestBed } from '@angular/core/testing';

import { AlbumArtistaService } from './album-artista.service';

describe('AlbumArtistaService', () => {
  let service: AlbumArtistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumArtistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
