import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAprovarrechazarComponent } from './dialog-aprovarrechazar.component';

describe('DialogAprovarrechazarComponent', () => {
  let component: DialogAprovarrechazarComponent;
  let fixture: ComponentFixture<DialogAprovarrechazarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAprovarrechazarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAprovarrechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
