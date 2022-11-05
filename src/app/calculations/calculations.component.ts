import { Component, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html'
})
export class CalculationsComponent implements OnChanges {
  @Input()
  isDrawn: boolean = false;

  private dialogRef?: MatDialogRef<DialogComponent>;

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDrawn'].currentValue) {
      this.dialogRef = this.dialog.open(DialogComponent, {
        hasBackdrop: false,
        disableClose: true,
        position: { top: 'calc(50vh - 100px)', left: '3rem' },
        panelClass: 'dialog'
      });
      this.dialogRef._containerInstance['_elementRef'].nativeElement['classList'].remove('mat-dialog-container');
    } else {
      this.dialogRef?.close();
    }
  }
}
