import { ElementRef, Injectable } from '@angular/core';
import { Point } from './points.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private context?: CanvasRenderingContext2D;

  public initWithCanvas(canvas: ElementRef<HTMLCanvasElement>): void {
    this.context = canvas.nativeElement.getContext('2d')!;
  }

  public reset(): void {
    this.context?.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
  }

  public drawPart(from: Point, to: Point): void {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(from.x, from.y);
      this.context.bezierCurveTo(from.x, from.y, to.x, to.y, to.x, to.y);
      this.context.stroke();
      this.context.closePath();
    }
  }
}
