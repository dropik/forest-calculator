import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPointsListenerComponent } from './new-points-listener.component';

describe('NewPointsListenerComponent', () => {
  let component: NewPointsListenerComponent;
  let fixture: ComponentFixture<NewPointsListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPointsListenerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPointsListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
