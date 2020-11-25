import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonReconocimientoComponent } from './admon-reconocimiento.component';

describe('AdmonReconocimientoComponent', () => {
  let component: AdmonReconocimientoComponent;
  let fixture: ComponentFixture<AdmonReconocimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmonReconocimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmonReconocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
