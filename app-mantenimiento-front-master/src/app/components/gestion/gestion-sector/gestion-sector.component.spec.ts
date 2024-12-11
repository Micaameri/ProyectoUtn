import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSectorComponent } from './gestion-sector.component';

describe('GestionSectorComponent', () => {
  let component: GestionSectorComponent;
  let fixture: ComponentFixture<GestionSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
