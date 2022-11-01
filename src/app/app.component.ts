import { Component } from '@angular/core';
import { CanvasService } from './canvas.service';
import { DrawingStateService } from './drawing-state.service';
import { PointsService } from './points.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pointsService: PointsService, private drawingStateService: DrawingStateService, private canvasService: CanvasService) { }

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
    this.canvasService.reset();
    this.pointsService.resetPoints();
    this.drawState = "not-drawn";
  }

  private set drawState(value) {
    this.drawingStateService.state = value;
  }
}
