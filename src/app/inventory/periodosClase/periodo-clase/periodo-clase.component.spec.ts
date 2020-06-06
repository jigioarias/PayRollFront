import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoClaseComponent } from './periodo-clase.component';

describe('PeriodoClaseComponent', () => {
  let component: PeriodoClaseComponent;
  let fixture: ComponentFixture<PeriodoClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
