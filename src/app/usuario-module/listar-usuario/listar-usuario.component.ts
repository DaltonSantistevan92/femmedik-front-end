import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/servicios/tool.service';
import { IUE, User } from '../interface/usuario';
import { UsuarioService } from '../services/usuario.service';

import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioComponent } from '../modales/editar-usuario/editar-usuario.component';
import { DialogElementsComponent } from '../../components/dialog-elements/dialog-elements.component';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  public usuario: User [] = []; 
  public objUsuario! : IUE;
  public titulo = 'usuario';

  constructor(
    private _us:UsuarioService,
    private _ts:ToolService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this._us.getAllUser().subscribe( res => { 
      if (res.status) {
        this.usuario = res.usuario; 
      } 
    });
  }

  verimg(image:string):string{
    return this._ts.mostrarArchivo('usuarios', image);
  }

  editar(user:User){
    const ref = this.dialog.open( EditarUsuarioComponent, { data : { user }, width: '620px'} );
    
    ref.afterClosed().subscribe((res:any) => {
      if (res != undefined) {
        this.cargarUsuarios();
      }
    });
  }

  dialogEliminar(id:number){
    const ref = this.dialog.open( DialogElementsComponent, { data : { id, einpoint: 'usuario/eliminar', titulo: this.titulo }, width: '620px'} );
    
    ref.afterClosed().subscribe((res:any) => {    
      if (res == undefined) {
       this.cargarUsuarios();
      }
    });
  }



}
