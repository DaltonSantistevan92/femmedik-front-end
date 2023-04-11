import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNavComponent } from './usuario-nav.component';

describe('UsuarioNavComponent', () => {
  let component: UsuarioNavComponent;
  let fixture: ComponentFixture<UsuarioNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
