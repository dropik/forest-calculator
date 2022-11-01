import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawFieldComponent } from './draw-field.component';

describe('DrawFieldComponent', () => {
  let component: DrawFieldComponent;
  let fixture: ComponentFixture<DrawFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
