import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDebitarComponent } from './dialog-debitar.component';

describe('DialogDebitarComponent', () => {
  let component: DialogDebitarComponent;
  let fixture: ComponentFixture<DialogDebitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDebitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDebitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
