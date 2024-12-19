import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';  // Import the SharedModule
import { HomeRoutingModule } from './home-routing.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgbCollapseModule
  ],
  exports: [HomeComponent] 
})
export class HomeModule { }
