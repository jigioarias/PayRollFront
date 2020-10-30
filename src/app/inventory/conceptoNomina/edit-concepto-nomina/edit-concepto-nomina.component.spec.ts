import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConceptoNominaComponent } from './edit-concepto-nomina.component';

describe('EditConceptoNominaComponent', () => {
  let component: EditConceptoNominaComponent;
  let fixture: ComponentFixture<EditConceptoNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConceptoNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConceptoNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
