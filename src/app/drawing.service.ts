import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import { Point, PointsService } from './points.service';

export type DrawingState = 'not-drawn' | 'drawing' | 'drawn';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  constructor(private pointsService: PointsService, private canvasService: CanvasService) { }

  private _state: DrawingState = 'not-drawn';

  public get state(): DrawingState {
    return this._state;
  }

  private set state(value: DrawingState) {
    this._state = value;
  }

  public startDrawing(): void {
    this.state = 'drawing';
  }

  public addPoint(point: Point): void {
    if (this.state !== 'drawing') {
      return;
    }

    if (this.points.length === 0) {
      this.makeFirstPoint(point);
    } else {
      this.addNextPoint(point);
    }
  }

  private makeFirstPoint(point: Point): void {
    this.points.push({ x: point.x, y: point.y });
  }

  private addNextPoint(point: Point): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const newPoint: Point = { x: point.x, y: point.y };
    this.canvasService.drawPart(lastPoint, newPoint);
    this.points.push(newPoint);
  }

  private get points(): { x: number, y: number }[] {
    return this.pointsService.points;
  }

  public closeShape(): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const firstPoint = this.points[0];
    this.canvasService.drawPart(lastPoint, firstPoint);
    this.state = "drawn";
  }

  public reset(): void {
    this.canvasService.reset();
    this.pointsService.resetPoints();
    this.state = "not-drawn";
  }

  public movePoint(id: number, newPoint: Point): void {
    this.points[id].x = newPoint.x;
    this.points[id].y = newPoint.y;
    this.canvasService.reset();

    let p1 = this.points[0];
    for (let i = 1; i < this.points.length; i++) {
      let p2 = this.points[i];
      this.canvasService.drawPart(p1, p2);
      p1 = p2;
    }

    if (this.state === 'drawn') {
      this.canvasService.drawPart(this.points[this.points.length - 1], this.points[0]);
    }
  }
}
