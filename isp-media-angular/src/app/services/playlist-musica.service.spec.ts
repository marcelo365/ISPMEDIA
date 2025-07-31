import { TestBed } from '@angular/core/testing';

import { PlaylistMusicaService } from './playlist-musica.service';

describe('PlaylistMusicaService', () => {
  let service: PlaylistMusicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistMusicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
