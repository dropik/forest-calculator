import { Component, Input } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { DrawingStateService } from 'src/app/drawing-state.service';
import { Point, PointsService } from 'src/app/points.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
  @Input()
  point!: Point;

  constructor(private pointsService: PointsService, private drawingStateService: DrawingStateService, private canvasService: CanvasService) { }

  public get top(): number {
    return this.point.y - this.remToPx(0.5);
  }

  public get left(): number {
    return this.point.x - this.remToPx(0.5);
  }

  private get drawState() {
    return this.drawingStateService.state;
  }

  private set drawState(value) {
    this.drawingStateService.state = value;
  }

  public get points(): { x: number, y: number }[] {
    return this.pointsService.points;
  }

  private remToPx(rem: number): number {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
  }

  public stopDrawing(): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const firstPoint = this.points[0];
    this.canvasService.drawPart(lastPoint, firstPoint);
    this.drawState = "drawn";
  }
}
