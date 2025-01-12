import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapplicationComponent } from './myapplication.component';

describe('MyapplicationComponent', () => {
  let component: MyapplicationComponent;
  let fixture: ComponentFixture<MyapplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyapplicationComponent]
    });
    fixture = TestBed.createComponent(MyapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
