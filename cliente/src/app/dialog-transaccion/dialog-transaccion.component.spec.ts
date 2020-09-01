import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransaccionComponent } from './dialog-transaccion.component';

describe('DialogTransaccionComponent', () => {
  let component: DialogTransaccionComponent;
  let fixture: ComponentFixture<DialogTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
