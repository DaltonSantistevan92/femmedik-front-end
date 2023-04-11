import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IM } from '../dashboard/interfaces/menu';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private _bs: BaseService,
    private http: HttpClient
  ) { }

  getMenu(rol_id: number, sesionPadre:number = 0){
    let url = `${this._bs.getApi()}/menu/${rol_id}/${sesionPadre}`;
    return this.http.get<IM>(url);
  }

}
