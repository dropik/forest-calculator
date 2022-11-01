import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasService } from '../canvas.service';
import { DrawingStateService } from '../drawing-state.service';
import { Point, PointsService } from '../points.service';

@Component({
  selector: 'app-draw-field',
  templateUrl: './draw-field.component.html',
  styleUrls: ['./draw-field.component.scss']
})
export class DrawFieldComponent implements AfterViewInit {
  @ViewChild('drawRoot')
  private canvas?: ElementRef<HTMLCanvasElement>;

  constructor(private pointsService: PointsService, private drawingStateService: DrawingStateService, private canvasService: CanvasService) { }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = document.body.clientWidth;
      this.canvas.nativeElement.height = document.body.clientHeight;
      this.canvasService.initWithCanvas(this.canvas);
    }
  }

  private get drawState() {
    return this.drawingStateService.state;
  }

  private set drawState(value) {
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
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const newPoint: Point = { x: e.x, y: e.y };
    this.canvasService.drawPart(lastPoint, newPoint);
    this.points.push(newPoint);
  }

  public stopDrawing(): void {
    const lastPointId = this.points.length - 1;
    const lastPoint = this.points[lastPointId];
    const firstPoint = this.points[0];
    this.canvasService.drawPart(lastPoint, firstPoint);
    this.drawState = "drawn";
  }
}
