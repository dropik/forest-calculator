import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCard, MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawFieldComponent } from './draw-field/draw-field.component';
import { PointComponent } from './draw-field/point/point.component';
import { NewPointsListenerComponent } from './draw-field/new-points-listener/new-points-listener.component';
import { CanvasInitComponent } from './draw-field/canvas-init/canvas-init.component';
import { TopAppBarComponent } from './top-app-bar/top-app-bar.component';
import { DrawButtonComponent } from './draw-button/draw-button.component';
import { ControlPointComponent } from './draw-field/control-point/control-point.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { DialogComponent } from './calculations/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawFieldComponent,
    PointComponent,
    NewPointsListenerComponent,
    CanvasInitComponent,
    TopAppBarComponent,
    DrawButtonComponent,
    ControlPointComponent,
    CalculationsComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    DragDropModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
