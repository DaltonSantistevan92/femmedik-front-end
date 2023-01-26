import { Injectable } from '@angular/core';
import { BaseService } from '../../servicios/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  public nameUsuario: string = '';
  public countUser: number = 0;

  public nameRol: string = '';
  public countRol: number = 0;

  key: string = 'ok';

  constructor(private _bs: BaseService, private http: HttpClient) {
    this.countUsers();
    this.countRols();

  
  }

  countUsers(){
    let urlUser = `${this._bs.getApi()}/usuario/contar`;
    return this.http.get(urlUser).subscribe((res:any) => {    
      if(res.status){   
        this.nameUsuario = res.usuario;  
        this.countUser = res.cantidad; 
      }  
    });  
  }

  countRols(){
    let urlRol = `${this._bs.getApi()}/rol/contar`;
    return this.http.get(urlRol).subscribe((res:any) => {    
      if(res.status){   
        this.nameRol = res.rol;  
        this.countRol = res.cantidad; 
      }  
    });  
  }

  
}
