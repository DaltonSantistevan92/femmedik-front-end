import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioNavComponent } from './horario-nav.component';

describe('HorarioNavComponent', () => {
  let component: HorarioNavComponent;
  let fixture: ComponentFixture<HorarioNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
