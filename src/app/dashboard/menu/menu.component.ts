import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Menu } from '../interfaces/menu';
import { UserService } from '../../auth/services/user.service';
import { MenuService } from './../../servicios/menu.service';
import { ToolService } from '../../servicios/tool.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('drawer') matDrawer:any;

  nombreCompleto: string = '';
  cargo : string = '';
  img: string = '';
  rol_id : number = 0;

  public menus : Menu [] = [];

  constructor(
    private router: Router, private cookieSer:CookieService, private _us:UserService,
    private _ms : MenuService, private _ts : ToolService
  ) { }

  ngOnInit(): void {
    this.changeCabecera();
    this.changeMenu();
  }

  changeCabecera(){
    let local = this._ts.returnLocalStorage();

    if (local != null) {
      this.nombreCompleto = `${local.persona.nombre} ${local.persona.apellido}`; 
      this.cargo = `${local.rol.cargo}`;
      this.img = `${local.imagen}`;
      this.img = this._ts.mostrarArchivo('usuarios', this.img);
      this.rol_id = local.rol_id;
    } else {
      console.log('no hay usuario en el local');
    }
  }

  changeMenu(){
    this._ms.getMenu(this.rol_id).subscribe( res => { 
      if (res.status) {
        this.menus = res.menu;
      } else {
        console.log('No hay menus');
      }
    });
  }

  cerrarMenu(event:any){
    this.matDrawer.close();
  }

  salir(){
    const token = this.cookieSer.get('token');
    //console.log('mi token en salir', token);

    if(token != null){
      this.goOut( token );
    }else{
      console.log('no hay token en btn salir');
    }
  }

  goOut(token:string){
    this._us.goOut(token).subscribe( res => {
      //console.log(res);
      if(res){
        localStorage.removeItem('usuario');
        this.cookieSer.delete('token');
        this.router.navigateByUrl('/login');
      }
    });
  }


}
