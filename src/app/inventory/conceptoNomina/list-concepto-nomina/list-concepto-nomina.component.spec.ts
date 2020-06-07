import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConceptoNominaComponent } from './list-concepto-nomina.component';

describe('ListConceptoNominaComponent', () => {
  let component: ListConceptoNominaComponent;
  let fixture: ComponentFixture<ListConceptoNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConceptoNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConceptoNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
