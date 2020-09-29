import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEmployeesComponent } from './load-employees.component';

describe('LoadEmployeesComponent', () => {
  let component: LoadEmployeesComponent;
  let fixture: ComponentFixture<LoadEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
