import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacationsComponent } from './create-vacations.component';

describe('CreateVacationsComponent', () => {
  let component: CreateVacationsComponent;
  let fixture: ComponentFixture<CreateVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
