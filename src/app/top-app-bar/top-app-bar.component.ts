import { Component } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent {
  constructor(private drawingService: DrawingService) { }

  public reset(): void {
    this.drawingService.reset();
  }
}
