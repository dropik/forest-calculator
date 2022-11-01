import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawingStateService {
  public state: 'not-drawn' | 'drawing' | 'drawn' = 'not-drawn';
}
