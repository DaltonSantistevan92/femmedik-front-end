import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/servicios/base.service';
import { IR } from '../interface/rol';
import { ILU, IUE, IUR, IG } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private _bs : BaseService) { }

  getRol(){
    let url =`${this._bs.getApi()}/rol/listar`;
    return this.http.get<IR>( url ); 
  }

  saveUser(data: any){
    let url =`${this._bs.getApi()}/usuario/guardar`;
    return this.http.post( url, data ); 
  }

  getAllUser(){
    let url =`${this._bs.getApi()}/usuario/listar`;
    return this.http.get<ILU>( url );
  }

  findUser( id: number ){//sin utilizar
    let url =`${this._bs.getApi()}/usuario/listar/${id}`;
    return this.http.get<IUR>( url );
  }

  edituser(data: IUE){
    let url =`${this._bs.getApi()}/usuario/editar`;
    return this.http.post<IUR>( url, data );
  }

  deleteUser(data: IUE){
    let url =`${this._bs.getApi()}/usuario/eliminar`;
    return this.http.post<IUR>( url, data );
  }

}
