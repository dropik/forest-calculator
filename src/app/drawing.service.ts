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
}
