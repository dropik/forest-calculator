import { Component } from '@angular/core';
import { ControlPoints, Point, PointsService } from '../points.service';

@Component({
  selector: 'app-draw-field',
  templateUrl: './draw-field.component.html'
})
export class DrawFieldComponent {
  constructor(private pointsService: PointsService) { }

  public get points(): Point[] {
    return this.pointsService.points;
  }

  public get controlPoints(): ControlPoints[] {
    return this.pointsService.controlPoints;
  }

  public get selectedPoint(): number | undefined {
    return this.pointsService.selectedPoint;
  }
}
