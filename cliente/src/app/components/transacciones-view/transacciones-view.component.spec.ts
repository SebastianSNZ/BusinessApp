import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesViewComponent } from './transacciones-view.component';

describe('TransaccionesViewComponent', () => {
  let component: TransaccionesViewComponent;
  let fixture: ComponentFixture<TransaccionesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
