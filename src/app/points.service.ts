import { Injectable } from '@angular/core';

export type Point = {
  x: number,
  y: number
};

export type ControlPoints = {
  left: Point,
  right: Point
};

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private _points: Point[] = [];
  private _controlPoints: ControlPoints[] = [];

  public get points(): Point[] {
    return this._points;
  }

  public get controlPoints(): ControlPoints[] {
    return this._controlPoints;
  }

  public resetPoints(): void {
    this._points = [];
    this._controlPoints = [];
  }
}
