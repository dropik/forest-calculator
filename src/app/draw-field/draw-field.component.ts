import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawingStateService } from '../drawing-state.service';
import { PointsService } from '../points.service';

@Component({
  selector: 'app-draw-field',
  templateUrl: './draw-field.component.html',
  styleUrls: ['./draw-field.component.scss']
})
export class DrawFieldComponent implements AfterViewInit {
  @ViewChild('drawRoot')
  private canvas?: ElementRef<HTMLCanvasElement>;

  public context?: CanvasRenderingContext2D;

  constructor(private pointsService: PointsService, private drawingStateService: DrawingStateService) { }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = document.body.clientWidth;
      this.canvas.nativeElement.height = document.body.clientHeight;
      this.context = this.canvas.nativeElement.getContext('2d')!;
    }
  }

  public get drawState() {
    return this.drawingStateService.state;
  }

  public set drawState(value) {
    this.drawingStateService.state = value;
  }

  public get points(): { x: number, y: number }[] {
    return this.pointsService.points;
  }

  public handleCanvasClick(e: MouseEvent): void {
    if (this.drawState != 'drawing') {
      return;
    }

    if (this.points.length === 0) {
      this.startDrawing(e);
    } else {
      this.updatePath(e);
    }
  }

  private startDrawing(e: MouseEvent): void {
    this.points.push({ x: e.x, y: e.y });
  }

  private updatePath(e: MouseEvent): void {
    if (this.context) {
      const lastPointId = this.points.length - 1;
      const lastPoint = this.points[lastPointId];
      this.context.beginPath();
      this.context.moveTo(lastPoint.x, lastPoint.y);
      this.context.bezierCurveTo(lastPoint.x, lastPoint.y, e.x, e.y, e.x, e.y);
      this.context.stroke();
      this.context.closePath();
      this.points.push({ x: e.x, y: e.y });
    }
  }

  public stopDrawing(): void {
    if (this.context) {
      const lastPointId = this.points.length - 1;
      const lastPoint = this.points[lastPointId];
      const firstPoint = this.points[0];
      this.context.beginPath();
      this.context.moveTo(lastPoint.x, lastPoint.y);
      this.context.bezierCurveTo(lastPoint.x, lastPoint.y, firstPoint.x, firstPoint.y, firstPoint.x, firstPoint.y);
      this.context.stroke();
      this.context.closePath();
    }
    this.drawState = "drawn";
  }

  public remToPx(rem: number): number {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
  }
}