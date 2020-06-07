import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoNominaComponent } from './concepto-nomina.component';

describe('ConceptoNominaComponent', () => {
  let component: ConceptoNominaComponent;
  let fixture: ComponentFixture<ConceptoNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptoNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptoNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
