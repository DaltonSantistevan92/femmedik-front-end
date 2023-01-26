import { Component, OnInit } from '@angular/core';
import { DashService } from '../services/dash.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']
})
export class AdminDashComponent implements OnInit {

  constructor(public _ds: DashService) { }

  ngOnInit(): void {
  }

}
