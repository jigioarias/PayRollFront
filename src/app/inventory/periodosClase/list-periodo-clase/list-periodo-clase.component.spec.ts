import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPeriodoClaseComponent } from './list-periodo-clase.component';

describe('ListPeriodoClaseComponent', () => {
  let component: ListPeriodoClaseComponent;
  let fixture: ComponentFixture<ListPeriodoClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPeriodoClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPeriodoClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
