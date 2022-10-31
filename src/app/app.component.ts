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

  ngAfterViewInit(): void {
    this.context = this.canvas?.nativeElement.getContext('2d')!;
  }
}
