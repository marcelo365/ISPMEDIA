import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLoginRegistoComponent } from './pagina-login-registo.component';

describe('PaginaLoginRegistoComponent', () => {
  let component: PaginaLoginRegistoComponent;
  let fixture: ComponentFixture<PaginaLoginRegistoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaLoginRegistoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaLoginRegistoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
