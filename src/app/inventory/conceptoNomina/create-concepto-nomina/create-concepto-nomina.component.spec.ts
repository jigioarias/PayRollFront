import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConceptoNominaComponent } from './create-concepto-nomina.component';

describe('CreateConceptoNominaComponent', () => {
  let component: CreateConceptoNominaComponent;
  let fixture: ComponentFixture<CreateConceptoNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConceptoNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConceptoNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
