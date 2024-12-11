import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPisoComponent } from './gestion-piso.component';

describe('GestionPisoComponent', () => {
  let component: GestionPisoComponent;
  let fixture: ComponentFixture<GestionPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPisoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
