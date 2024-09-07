import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css','./not-foun.scss']
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  @Output() resetView = new EventEmitter<void>();

  // Call this method when the "Back" button is clicked
  onBackClicked() {
    this.resetView.emit();
  }
  
  
}
