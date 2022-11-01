import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasInitComponent } from './canvas-init.component';

describe('CanvasInitComponent', () => {
  let component: CanvasInitComponent;
  let fixture: ComponentFixture<CanvasInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
