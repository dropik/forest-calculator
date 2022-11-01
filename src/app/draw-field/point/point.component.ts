import { Component, Input } from '@angular/core';
import { DrawingService } from 'src/app/drawing.service';
import { Point } from 'src/app/points.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
  @Input()
  point!: Point;

  constructor(private drawingService: DrawingService) { }

  public get top(): number {
    return this.point.y - this.remToPx(0.5);
  }

  public get left(): number {
    return this.point.x - this.remToPx(0.5);
  }

  private remToPx(rem: number): number {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
  }

  public closeShape(): void {
    this.drawingService.closeShape();
  }
}
