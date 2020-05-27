import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParametersComponent } from './list-parameters.component';

describe('ListParametersComponent', () => {
  let component: ListParametersComponent;
  let fixture: ComponentFixture<ListParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
