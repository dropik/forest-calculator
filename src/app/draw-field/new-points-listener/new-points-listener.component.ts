import { Component } from '@angular/core';
import { DrawingService } from 'src/app/drawing.service';

@Component({
  selector: 'app-new-points-listener',
  templateUrl: './new-points-listener.component.html',
  styleUrls: ['./new-points-listener.component.scss']
})
export class NewPointsListenerComponent {
  constructor(private drawingService: DrawingService) { }

  public onClick(e: MouseEvent): void {
    this.drawingService.addPoint(e);
    this.drawingService.unselectPoint();
  }
}
