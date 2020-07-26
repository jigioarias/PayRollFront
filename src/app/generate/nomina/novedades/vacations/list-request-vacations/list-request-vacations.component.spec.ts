import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestVacationsComponent } from './list-request-vacations.component';

describe('ListRequestVacationsComponent', () => {
  let component: ListRequestVacationsComponent;
  let fixture: ComponentFixture<ListRequestVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRequestVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequestVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
