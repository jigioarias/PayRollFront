import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseNominaComponent } from './clase-nomina.component';

describe('ClaseNominaComponent', () => {
  let component: ClaseNominaComponent;
  let fixture: ComponentFixture<ClaseNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaseNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
