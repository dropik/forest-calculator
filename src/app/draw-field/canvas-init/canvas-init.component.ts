import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';

@Component({
  selector: 'app-canvas-init',
  templateUrl: './canvas-init.component.html',
  styleUrls: ['./canvas-init.component.scss']
})
export class CanvasInitComponent implements AfterViewInit {
  @ViewChild('drawRoot')
  private canvas?: ElementRef<HTMLCanvasElement>;

  constructor(private canvasService: CanvasService) { }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.canvas.nativeElement.width = document.body.clientWidth;
      this.canvas.nativeElement.height = document.body.clientHeight;
      this.canvasService.initWithCanvas(this.canvas);
    }
  }
}
