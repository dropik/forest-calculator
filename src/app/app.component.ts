import { Component } from '@angular/core';
import { DrawingService, DrawingState } from './drawing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private drawingService: DrawingService) { }

  public get drawingState(): DrawingState {
    return this.drawingService.state;
  }
}
