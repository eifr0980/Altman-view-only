import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyResidentsComponent } from './my-residents.component';

describe('MyResidentsComponent', () => {
  let component: MyResidentsComponent;
  let fixture: ComponentFixture<MyResidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyResidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyResidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
