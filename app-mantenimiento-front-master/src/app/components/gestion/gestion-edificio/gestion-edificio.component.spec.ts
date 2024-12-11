import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEdificioComponent } from './gestion-edificio.component';

describe('GestionEdificioComponent', () => {
  let component: GestionEdificioComponent;
  let fixture: ComponentFixture<GestionEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEdificioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
