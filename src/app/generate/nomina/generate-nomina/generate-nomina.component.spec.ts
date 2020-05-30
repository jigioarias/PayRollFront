import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNominaComponent } from './generate-nomina.component';

describe('GenerateNominaComponent', () => {
  let component: GenerateNominaComponent;
  let fixture: ComponentFixture<GenerateNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
