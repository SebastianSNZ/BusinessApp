import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesViewComponent } from './solicitudes-view.component';

describe('SolicitudesViewComponent', () => {
  let component: SolicitudesViewComponent;
  let fixture: ComponentFixture<SolicitudesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
