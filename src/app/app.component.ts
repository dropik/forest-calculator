import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawRoot')
  private canvas?: ElementRef<HTMLCanvasElement>;
  private context?: CanvasRenderingContext2D;
  private startedDrawing = false;
  private _points: { x: number, y: number }[] = [];

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = document.body.clientWidth;
      this.canvas.nativeElement.height = document.body.clientHeight;
      this.context = this.canvas.nativeElement.getContext('2d')!;
    }
  }

  public get points(): { x: number, y: number }[] {
    return this._points;
  }

  public clickHandler(e: MouseEvent): void {
    if (!this.startedDrawing) {
      this.startedDrawing = true;
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
    this.startedDrawing = false;
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
}
