import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAdminComponent } from './solicitudes-admin.component';

describe('SolicitudesAdminComponent', () => {
  let component: SolicitudesAdminComponent;
  let fixture: ComponentFixture<SolicitudesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
