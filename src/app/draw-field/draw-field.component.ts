import { Component } from '@angular/core';
import { PointsService } from '../points.service';

@Component({
  selector: 'app-draw-field',
  templateUrl: './draw-field.component.html',
  styleUrls: ['./draw-field.component.scss']
})
export class DrawFieldComponent {
  constructor(private pointsService: PointsService) { }

  public get points(): { x: number, y: number }[] {
    return this.pointsService.points;
  }
}
