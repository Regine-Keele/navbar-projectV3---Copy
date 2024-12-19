import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { SharedModule } from '../shared/shared.module';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DiaryComponent],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbAccordionModule
  ]
})
export class DiaryModule { }
