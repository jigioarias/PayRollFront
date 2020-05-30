import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClaseNominaComponent } from './create-clase-nomina.component';

describe('CreateClaseNominaComponent', () => {
  let component: CreateClaseNominaComponent;
  let fixture: ComponentFixture<CreateClaseNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClaseNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClaseNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
