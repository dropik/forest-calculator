import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasService } from '../canvas.service';
import { PointsService } from '../points.service';

@Component({
  selector: 'app-draw-field',
  templateUrl: './draw-field.component.html',
  styleUrls: ['./draw-field.component.scss']
})
export class DrawFieldComponent implements AfterViewInit {
  @ViewChild('drawRoot')
  private canvas?: ElementRef<HTMLCanvasElement>;

  constructor(private pointsService: PointsService, private canvasService: CanvasService) { }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = document.body.clientWidth;
      this.canvas.nativeElement.height = document.body.clientHeight;
      this.canvasService.initWithCanvas(this.canvas);
    }
  }

  public get points(): { x: number, y: number }[] {
    return this.pointsService.points;
  }
}
