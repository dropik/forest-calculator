import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { DrawingService } from 'src/app/drawing.service';
import { Point } from 'src/app/points.service';

@Component({
  selector: 'app-control-point',
  templateUrl: './control-point.component.html',
  styleUrls: ['./control-point.component.scss']
})
export class ControlPointComponent {
  @Input()
  point!: Point;

  @Input()
  id!: number;

  @Input()
  side!: 'left' | 'right';

  constructor(private drawingService: DrawingService, private canvasService: CanvasService) { }

  public get canvas(): ElementRef<HTMLCanvasElement> {
    return this.canvasService.canvas ?? new ElementRef<HTMLCanvasElement>(new HTMLCanvasElement());
  }

  public get position(): Point {
    return { x: this.point.x - this.remToPx(0.5), y: this.point.y - this.remToPx(0.5) };
  }

  private remToPx(rem: number): number {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
  }

  public movePoint(event: CdkDragMove): void {
    this.drawingService.moveControlPoint(this.id, this.side, event.pointerPosition);
  }
}
