import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUbicacionesComponent } from './gestion-ubicaciones.component';

describe('GestionUbicacionesComponent', () => {
  let component: GestionUbicacionesComponent;
  let fixture: ComponentFixture<GestionUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUbicacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
