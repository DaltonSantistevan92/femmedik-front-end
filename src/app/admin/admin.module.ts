import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminDashComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports : [
    AdminDashComponent
  ]
})
export class AdminModule { }
