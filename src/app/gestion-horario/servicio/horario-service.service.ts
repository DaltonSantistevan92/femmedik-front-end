import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../servicios/base.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioServiceService {

  constructor(private http:HttpClient, private _bs : BaseService) { }

  generateHorario(data: any){
    let url =`${this._bs.getApi()}/doctorhorario/generate`;
    return this.http.post( url, data ); 
  }


  getHorario(){
    let url =`${this._bs.getApi()}/doctorhorario/get`;
    return this.http.get( url ); 
  }

}
