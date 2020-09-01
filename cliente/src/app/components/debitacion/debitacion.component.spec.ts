import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitacionComponent } from './debitacion.component';

describe('DebitacionComponent', () => {
  let component: DebitacionComponent;
  let fixture: ComponentFixture<DebitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
