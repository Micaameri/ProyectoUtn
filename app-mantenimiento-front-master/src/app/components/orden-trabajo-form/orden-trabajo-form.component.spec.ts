import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTrabajoFormComponent } from './orden-trabajo-form.component';

describe('OrdenTrabajoFormComponent', () => {
  let component: OrdenTrabajoFormComponent;
  let fixture: ComponentFixture<OrdenTrabajoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenTrabajoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenTrabajoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
