import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClaseNominaComponent } from './list-clase-nomina.component';

describe('ListClaseNominaComponent', () => {
  let component: ListClaseNominaComponent;
  let fixture: ComponentFixture<ListClaseNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClaseNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClaseNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
