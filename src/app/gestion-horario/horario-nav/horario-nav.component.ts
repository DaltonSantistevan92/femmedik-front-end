import { Component, OnInit } from '@angular/core';
import { Menu } from '../../dashboard/interfaces/menu';
import { MenuService } from '../../servicios/menu.service';
import { ToolService } from '../../servicios/tool.service';

@Component({
  selector: 'app-horario-nav',
  templateUrl: './horario-nav.component.html',
  styleUrls: ['./horario-nav.component.scss']
})
export class HorarioNavComponent implements OnInit {

  rol_id : number = 0;
  public menuPadre = 5;
  public menusHijos : Menu [] = [];

  constructor(private _ms: MenuService, private _ts:ToolService) { }

  ngOnInit(): void {
    this.cargarMenuHijos();  
  }  

  cargarMenuHijos(){
    let local = this._ts.returnLocalStorage();

    if (local != null) {
      this.rol_id = local.rol_id;  
      this.serviceMenuHijos(this.rol_id, this.menuPadre);
    }else{
      console.log('No hay datos en el localStorage');  
    }
  }

  serviceMenuHijos(rol_id : number, menuPadre : number){
    this._ms.getMenu(rol_id, menuPadre).subscribe({
      next : (res) => {
        if (res.status) { this.menusHijos = res.menu; }
      },
      error : (e) => { console.log(e); }
    });
  }

}
