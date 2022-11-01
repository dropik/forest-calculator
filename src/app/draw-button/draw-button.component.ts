import { Component } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-draw-button',
  templateUrl: './draw-button.component.html',
  styleUrls: ['./draw-button.component.scss']
})
export class DrawButtonComponent {
  constructor(private drawingService: DrawingService) { }

  public get isNotDrawn(): boolean {
    return this.drawingService.state === 'not-drawn';
  }

  public startDrawing(): void {
    this.drawingService.startDrawing();
  }
}
