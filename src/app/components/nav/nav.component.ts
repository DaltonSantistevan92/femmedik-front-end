import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/dashboard/interfaces/menu';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
  public mas = false;
  @Input() menuHijos: Menu []=[];
 
  constructor( ) { }




}
