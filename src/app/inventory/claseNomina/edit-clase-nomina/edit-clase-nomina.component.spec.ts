import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClaseNominaComponent } from './edit-clase-nomina.component';

describe('EditClaseNominaComponent', () => {
  let component: EditClaseNominaComponent;
  let fixture: ComponentFixture<EditClaseNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClaseNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClaseNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
