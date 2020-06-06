import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPeriodoClaseComponent } from './edit-periodo-clase.component';

describe('EditPeriodoClaseComponent', () => {
  let component: EditPeriodoClaseComponent;
  let fixture: ComponentFixture<EditPeriodoClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPeriodoClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPeriodoClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
