import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PointsService } from './points.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawRoot')
  private canvas?: ElementRef<HTMLCanvasElement>;
  private context?: CanvasRenderingContext2D;

  constructor(private pointsService: PointsService) { }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = document.body.clientWidth;
      this.canvas.nativeElement.height = document.body.clientHeight;
      this.context = this.canvas.nativeElement.getContext('2d')!;
    }
  }

  public drawState: 'not-drawn' | 'drawing' | 'drawn' = 'not-drawn';

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

  public startDrawing(e: MouseEvent): void {
    this.points.push({ x: e.x, y: e.y });
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

  public updatePath(e: MouseEvent): void {
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

  public remToPx(rem: number): number {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
  }

  public prepareToDraw(): void {
    this.drawState = "drawing";
  }

  public resetCanvas(): void {
    this.context?.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    this.pointsService.resetPoints();
    this.drawState = "not-drawn";
  }
}
