import { Injectable } from '@angular/core';
import { BaseService } from '../../servicios/base.service';
import { HttpClient } from '@angular/common/http';
import { IM } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _bs: BaseService, private http: HttpClient) { }

  getMenu( rol_id: number, sesionPadre:number = 0){
    let url = `${this._bs.getApi()}/menu/${rol_id}/${sesionPadre}`;
    return this.http.get<IM>(url);
  }
}
