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
  private prevPointCoords: { x: number, y: number } = { x: 0, y: 0 };
  private firstPointCoords = this.prevPointCoords;

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = document.body.clientWidth;
      this.canvas.nativeElement.height = document.body.clientHeight;
      this.context = this.canvas.nativeElement.getContext('2d')!;
    }
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
    this.prevPointCoords = { x: e.x, y: e.y };
    this.firstPointCoords = this.prevPointCoords;
  }

  public stopDrawing(): void {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(this.prevPointCoords.x, this.prevPointCoords.y);
      this.context.bezierCurveTo(this.prevPointCoords.x, this.prevPointCoords.y, this.firstPointCoords.x, this.firstPointCoords.y, this.firstPointCoords.x, this.firstPointCoords.y);
      this.context.stroke();
      this.context.closePath();
    }
    this.startedDrawing = false;
  }

  public updatePath(e: MouseEvent): void {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(this.prevPointCoords.x, this.prevPointCoords.y);
      this.context.bezierCurveTo(this.prevPointCoords.x, this.prevPointCoords.y, e.x, e.y, e.x, e.y);
      this.prevPointCoords = { x: e.x, y: e.y };
      this.context.stroke();
      this.context.closePath();
    }
  }
}
