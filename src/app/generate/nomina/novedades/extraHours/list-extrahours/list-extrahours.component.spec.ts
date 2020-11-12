import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExtrahoursComponent } from './list-extrahours.component';

describe('ListExtrahoursComponent', () => {
  let component: ListExtrahoursComponent;
  let fixture: ComponentFixture<ListExtrahoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExtrahoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExtrahoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
