import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpButtonComponent } from '../help-button/help-button.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [HelpButtonComponent],
  imports: [
    CommonModule,
    NgbCollapseModule
  ],
  exports: [HelpButtonComponent]
})
export class SharedModule { }
