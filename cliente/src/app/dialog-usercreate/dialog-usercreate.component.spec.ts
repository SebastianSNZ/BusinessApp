import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUsercreateComponent } from './dialog-usercreate.component';

describe('DialogUsercreateComponent', () => {
  let component: DialogUsercreateComponent;
  let fixture: ComponentFixture<DialogUsercreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUsercreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUsercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
