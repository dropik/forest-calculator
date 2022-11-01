import { Component } from '@angular/core';
import { DrawingService } from './drawing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private drawingService: DrawingService) { }

  public get isNotDrawn(): boolean {
    return this.drawingService.state === 'not-drawn';
  }

  public startDrawing(): void {
    this.drawingService.startDrawing();
  }
}
