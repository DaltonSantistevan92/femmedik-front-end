import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserLogin } from '../interfaces/user';
import { BaseService } from '../../servicios/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private _bs : BaseService ) { }

  postLogin(data: IUserLogin){
    let url =`${this._bs.getApi()}/login`;
    return this.http.post<IUser>( url, data ); 
  }

  goOut(data:string){
    let url =`${this._bs.getApi()}/cerrar-sesion`;
    return this.http.post( url, data );
  }


}
