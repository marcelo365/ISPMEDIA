import { TestBed } from '@angular/core/testing';

import { PrivilegioEditorService } from './privilegio-editor.service';

describe('PrivilegioEditorService', () => {
  let service: PrivilegioEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegioEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
