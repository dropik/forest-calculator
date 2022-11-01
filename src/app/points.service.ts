import { Injectable } from '@angular/core';

export type Point = {
  x: number,
  y: number
};

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private _points: Point[] = [];

  public get points(): Point[] {
    return this._points;
  }

  public resetPoints(): void {
    this._points = [];
  }
}
