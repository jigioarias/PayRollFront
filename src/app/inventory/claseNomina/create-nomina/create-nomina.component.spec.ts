import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNominaComponent } from './create-nomina.component';

describe('CreateNominaComponent', () => {
  let component: CreateNominaComponent;
  let fixture: ComponentFixture<CreateNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
