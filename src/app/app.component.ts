import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawFieldComponent } from './draw-field/draw-field.component';
import { DrawingStateService } from './drawing-state.service';
import { PointsService } from './points.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DrawFieldComponent)
  private drawField!: DrawFieldComponent;

  constructor(private pointsService: PointsService, private drawingStateService: DrawingStateService) { }

  public get drawState() {
    return this.drawingStateService.state;
  }

  public get points(): { x: number, y: number }[] {
    return this.pointsService.points;
  }

  public prepareToDraw(): void {
    this.drawState = "drawing";
  }

  public resetCanvas(): void {
    this.drawField.context?.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    this.pointsService.resetPoints();
    this.drawState = "not-drawn";
  }

  private set drawState(value) {
    this.drawingStateService.state = value;
  }
}
