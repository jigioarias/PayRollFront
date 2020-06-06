import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosClaseComponent } from './periodos-clase.component';

describe('PeriodosClaseComponent', () => {
  let component: PeriodosClaseComponent;
  let fixture: ComponentFixture<PeriodosClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodosClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodosClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
