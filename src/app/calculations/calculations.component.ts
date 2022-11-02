import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnChanges {
  @Input()
  isDrawn: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.dialog.open()
  }
}
