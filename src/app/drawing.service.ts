import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import { ControlPoints, Point, PointsService } from './points.service';

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
    this.controlPoints.push({ right: { x: point.x, y: point.y }, left: { x: point.x, y: point.y } });
  }

  private addNextPoint(point: Point): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    this.points.push({ x: point.x, y: point.y });
    const dir: Point = { x: point.x - lastPoint.x, y: point.y - lastPoint.y };
    const length = Math.sqrt(dir.x * dir.x + dir.y * dir.y) / 100;
    dir.x /= length;
    dir.y /= length;
    this.controlPoints[lastPointId].right.x += dir.x;
    this.controlPoints[lastPointId].right.y += dir.y;
    this.controlPoints.push({ left: { x: point.x - dir.x, y: point.y - dir.y }, right: { x: point.x, y: point.y } });
    const cp1 = this.controlPoints[lastPointId].right;
    const cp2 = this.controlPoints[lastPointId + 1].left;
    this.canvasService.drawPart(lastPoint, point, cp1, cp2);
    this.canvasService.drawControlLine(lastPoint, cp1);
    this.canvasService.drawControlLine(point, cp2);
  }

  private get points(): Point[] {
    return this.pointsService.points;
  }

  private get controlPoints(): ControlPoints[] {
    return this.pointsService.controlPoints;
  }

  public closeShape(): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const firstPoint = this.points[0];
    const dir: Point = { x: firstPoint.x - lastPoint.x, y: firstPoint.y - lastPoint.y };
    const length = Math.sqrt(dir.x * dir.x + dir.y * dir.y) / 100;
    dir.x /= length;
    dir.y /= length;
    this.controlPoints[lastPointId].right.x += dir.x;
    this.controlPoints[lastPointId].right.y += dir.y;
    this.controlPoints[0].left.x -= dir.x;
    this.controlPoints[0].left.y -= dir.y;
    const cp1 = this.controlPoints[lastPointId].right;
    const cp2 = this.controlPoints[0].left;
    this.canvasService.drawPart(lastPoint, firstPoint, cp1, cp2);
    this.canvasService.drawControlLine(lastPoint, cp1);
    this.canvasService.drawControlLine(firstPoint, cp2);
    this.state = "drawn";
  }

  public reset(): void {
    this.canvasService.reset();
    this.pointsService.resetPoints();
    this.state = "not-drawn";
  }

  public movePoint(id: number, newPoint: Point): void {
    const prevPoint = this.points[id];
    const dir: Point = { x: newPoint.x - prevPoint.x, y: newPoint.y - prevPoint.y };
    this.points[id].x = newPoint.x;
    this.points[id].y = newPoint.y;
    const prevLeft = this.controlPoints[id].left;
    const prevRight = this.controlPoints[id].right;
    this.controlPoints[id].left = { x: prevLeft.x + dir.x, y: prevLeft.y + dir.y };
    this.controlPoints[id].right = { x: prevRight.x + dir.x, y: prevRight.y + dir.y };

    this.canvasService.reset();

    let p1 = this.points[0];
    for (let i = 1; i < this.points.length; i++) {
      let p2 = this.points[i];
      const cp1 = this.controlPoints[i - 1].right;
      const cp2 = this.controlPoints[i].left;
      this.canvasService.drawPart(p1, p2, cp1, cp2);
      this.canvasService.drawControlLine(p1, cp1);
      this.canvasService.drawControlLine(p2, cp2);
      p1 = p2;
    }

    if (this.state === 'drawn') {
      const p2 = this.points[0];
      const cp1 = this.controlPoints[this.controlPoints.length - 1].right;
      const cp2 = this.controlPoints[0].left;
      this.canvasService.drawPart(p1, p2, cp1, cp2);
      this.canvasService.drawControlLine(p1, cp1);
      this.canvasService.drawControlLine(p2, cp2);
    }
  }
}
