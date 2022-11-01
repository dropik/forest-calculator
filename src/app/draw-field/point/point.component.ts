import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from 'src/app/points.service';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent {
  @Input()
  point!: Point;
  @Output()
  stopDrawing = new EventEmitter();

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

  public onDblClick(): void {
    this.stopDrawing.emit();
  }
}
