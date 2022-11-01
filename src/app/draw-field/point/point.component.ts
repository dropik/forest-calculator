import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
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

  @Input()
  id!: number;

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

  public closeShape(): void {
    this.drawingService.closeShape();
  }

  public movePoint(event: CdkDragMove): void {
    this.drawingService.movePoint(this.id, { x: event.pointerPosition.x, y: event.pointerPosition.y });
  }

  public select(): void {
    this.drawingService.selectPoint(this.id);
  }
}
