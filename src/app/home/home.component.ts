import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isCollapsed: boolean = true;

  constructor() { }

  onHelpRequested() {
    this.isCollapsed = !this.isCollapsed;
}
}
