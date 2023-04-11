import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { IUE, IG } from '../usuario-module/interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http:HttpClient, private _bs : BaseService) { }

  delete(data: IUE, einpoint: string){
    let url =`${this._bs.getApi()}/${einpoint}`;
    return this.http.post<IG>( url, data );
  }
}
