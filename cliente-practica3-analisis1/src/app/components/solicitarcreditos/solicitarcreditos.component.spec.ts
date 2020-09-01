import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarcreditosComponent } from './solicitarcreditos.component';

describe('SolicitarcreditosComponent', () => {
  let component: SolicitarcreditosComponent;
  let fixture: ComponentFixture<SolicitarcreditosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarcreditosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarcreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
