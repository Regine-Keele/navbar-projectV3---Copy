import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.css']
})
export class HelpButtonComponent {
  @Output() helpRequested = new EventEmitter<void>();  // Event emitter to trigger help info

  constructor() {}

  onHelpClick() {
    this.helpRequested.emit();  // Emit the event to parent component when clicked
  }

  
}
