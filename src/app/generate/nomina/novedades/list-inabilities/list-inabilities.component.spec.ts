import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInabilitiesComponent } from './list-inabilities.component';

describe('ListInabilitiesComponent', () => {
  let component: ListInabilitiesComponent;
  let fixture: ComponentFixture<ListInabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
