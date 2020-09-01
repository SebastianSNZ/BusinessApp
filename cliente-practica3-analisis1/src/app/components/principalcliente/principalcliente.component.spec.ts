import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalclienteComponent } from './principalcliente.component';

describe('PrincipalclienteComponent', () => {
  let component: PrincipalclienteComponent;
  let fixture: ComponentFixture<PrincipalclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
