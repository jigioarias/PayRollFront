import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacationsMasiveComponent } from './create-vacations-masive.component';

describe('CreateVacationsMasiveComponent', () => {
  let component: CreateVacationsMasiveComponent;
  let fixture: ComponentFixture<CreateVacationsMasiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVacationsMasiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVacationsMasiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
