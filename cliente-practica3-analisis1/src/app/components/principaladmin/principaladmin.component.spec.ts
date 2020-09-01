import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaladminComponent } from './principaladmin.component';

describe('PrincipaladminComponent', () => {
  let component: PrincipaladminComponent;
  let fixture: ComponentFixture<PrincipaladminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipaladminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipaladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
