import { Component } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { DrawingStateService } from 'src/app/drawing-state.service';
import { Point, PointsService } from 'src/app/points.service';

@Component({
  selector: 'app-new-points-listener',
  templateUrl: './new-points-listener.component.html',
  styleUrls: ['./new-points-listener.component.scss']
})
export class NewPointsListenerComponent {
  constructor(private pointsService: PointsService, private drawingStateService: DrawingStateService, private canvasService: CanvasService) { }

  private get drawState() {
    return this.drawingStateService.state;
  }

  private set drawState(value) {
    this.drawingStateService.state = value;
  }

  public get points(): { x: number, y: number }[] {
    return this.pointsService.points;
  }

  public handleCanvasClick(e: MouseEvent): void {
    if (this.drawState != 'drawing') {
      return;
    }

    if (this.points.length === 0) {
      this.startDrawing(e);
    } else {
      this.updatePath(e);
    }
  }

  private startDrawing(e: MouseEvent): void {
    this.points.push({ x: e.x, y: e.y });
  }

  private updatePath(e: MouseEvent): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const newPoint: Point = { x: e.x, y: e.y };
    this.canvasService.drawPart(lastPoint, newPoint);
    this.points.push(newPoint);
  }

  public stopDrawing(): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const firstPoint = this.points[0];
    this.canvasService.drawPart(lastPoint, firstPoint);
    this.drawState = "drawn";
  }
}
