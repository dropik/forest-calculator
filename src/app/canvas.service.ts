import { ElementRef, Injectable } from '@angular/core';
import { Point } from './points.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private context?: CanvasRenderingContext2D;
  private _canvas?: ElementRef<HTMLCanvasElement>;

  public initWithCanvas(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas;
    this.context = canvas.nativeElement.getContext('2d')!;
  }

  public get canvas(): ElementRef<HTMLCanvasElement> | undefined {
    return this._canvas;
  }

  private set canvas(value: ElementRef<HTMLCanvasElement> | undefined) {
    this._canvas = value;
  }

  public reset(): void {
    this.context?.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
  }

  public drawPart(from: Point, to: Point, cp1: Point, cp2: Point): void {
    if (this.context) {
      this.context.strokeStyle = 'black';
      this.context.beginPath();
      this.context.moveTo(from.x, from.y);
      this.context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, to.x, to.y);
      this.context.stroke();
      this.context.closePath();
    }
  }

  public drawControlLine(point: Point, controlPoint: Point): void {
    if (this.context) {
      this.context.strokeStyle = 'gray';
      this.context.beginPath();
      this.context.moveTo(point.x, point.y);
      this.context.lineTo(controlPoint.x, controlPoint.y);
      this.context.stroke();
      this.context.closePath();
    }
  }
}
